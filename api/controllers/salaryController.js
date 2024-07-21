import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";
import { errorHandler } from "../utils/error.js";

export const calculateAndSaveSalary = async (req, res, next) => {
    const { emp_id, startDate, endDate } = req.body;

    try {
        // Fetch employee details
        const employee = await Employee.findById(emp_id);
        if (!employee) {
            return next(errorHandler(404, "Employee not found"));
        }

        const basicSalaryPerDay = employee.salary;

        // Fetch attendance records within the given date range
        const attendanceRecords = await Attendance.find({
            emp_id,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        if (!attendanceRecords || attendanceRecords.length === 0) {
            return next(errorHandler(404, "No attendance records found for the given date range"));
        }

        // Calculate total working days based on attendance
        let totalWorkingDays = 0;
        attendanceRecords.forEach(record => {
            if (record.status === 'full') totalWorkingDays += 1;
            if (record.status === 'half') totalWorkingDays += 0.5;
        });

        // Calculate total salary
        const totalSalary = basicSalaryPerDay * totalWorkingDays;

        // Fetch advance amount if any
        const advance = req.body.advance || 0;

        // Calculate final amount
        const finalAmount = totalSalary - advance;

        // Save the salary record
        const salaryRecord = new Salary({
            emp_id,
            date: new Date(),
            amount: finalAmount,
            advance
        });

        const savedSalary = await salaryRecord.save();

        res.status(201).json(savedSalary);
    } catch (error) {
        next(error);
    }
};
