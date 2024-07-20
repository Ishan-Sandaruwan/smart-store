import Employee from "../models/Employee.js";
import { errorHandler } from "../utils/error.js";

export const addEmployee = async (req, res, next) => {
    if (req.user.access < 2) {
        try {
            const newEmp = new Employee(req.body);
            await newEmp.save();
            res.send({ message: "employee added" });
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "no permission"));
    }

}
export const updateEmp = async (req, res, next) => {
    if (req.user.access < 2) {
        try {
            const updatedEmp = await Employee.findByIdAndUpdate(req.params.empId, {
                $set: {
                    name: req.body.name,
                    salary: req.body.salary,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    nic: req.body.nic
                },
            }, { new: true });
            res.status(200).json(updatedEmp);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "no permission"));
    }
}
export const deleteEmp = async (req, res, next) => {
    if (req.user.access < 2) {
        try {
            await Employee.findByIdAndDelete(req.params.empId);
            res.status(200).json('The employee has been deleted');
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "no permission"));
    }
}
export const getEmp = async (req, res, next) => {
    try {
        const emps = await Employee.find();
        res.json(emps);
    } catch (error) {
        next(error);
    }
}
export const getEmployee = async (req, res, next) => {
    try {
        const { searchBY, value } = req.query;

        // Validate the parameters
        const validSearchFields = ['mobile', 'name'];
        if (!validSearchFields.includes(searchBY)) {
            return next(errorHandler(400, 'Invalid search field'));
        }
        if (!value) {
            return next(errorHandler(400, 'missing value'))
        }
        if (searchBY === 'mobile') {
            if (isNaN(value)) {
                return next(errorHandler(400, 'Value for mobile must be a number'));
            }
        } else if (searchBY === 'name') {
            if (typeof value !== 'string') {
                return next(errorHandler(400, 'Value for name must be a string'));
            }
        }
        const query = {};
        query[searchBY] = searchBY === 'mobile' ? Number(value) : value;

        const employee = await Employee.find(query);
        if (employee.length === 0) {
            return next(errorHandler(404, 'Customer Not Found'));
        }
        res.json(employee);
    } catch (error) {
        next(error);
    }
}