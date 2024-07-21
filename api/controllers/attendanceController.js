import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import { errorHandler } from "../utils/error.js";

export const addAttendance = async (req, res, next) => {
    if (req.user.access < 3) {
        try {
            const { emp_id, date, status } = req.body;
            const employee = await Employee.findById(emp_id);
            if (!employee) {
                return next(errorHandler(404, "employee not found "));
            }
            const isoDate = new Date(date).toISOString();
            const existingAttendance = await Attendance.findOne({ emp_id, date: isoDate });
            if (existingAttendance) {
                return next(errorHandler(400, "attendance for this day already recorded"));
            }
            const newAttendance = new Attendance({ emp_id, date: isoDate, status });
            const savedAttendance = await newAttendance.save();
            res.status(200).json(savedAttendance);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "no permission"));
    }
}