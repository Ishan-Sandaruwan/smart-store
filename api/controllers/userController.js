import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
    try {
        const type = req.params.type;
        const validTypes = ['all', 'customer', 'cashier', 'admin'];
        if (!validTypes.includes(type)) {
            return next(errorHandler(400, "Unexpected type"));
        }
        if (type == 'all') {
            const allUsers = await User.find().select('-password');
            res.json(allUsers);
        } else {
            const Users = await User.find({ type }).select('-password');
            res.json(Users);
        }
    } catch (error) {
        next(error);
    }
}

export const getCustomer = async(req,res,next) => {
    try {
        const {searchBY,value} = req.query;

        // Validate the parameters
        const validSearchFields = ['mobile', 'name'];
        if (!validSearchFields.includes(searchBY)) {
            return next(errorHandler(400, 'Invalid search field'));
        }
        if(!value){
            return next(errorHandler(400,'missing value'))
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

        const customer = await User.find(query).select('-password');
        if(customer.length === 0 ){
            return next(errorHandler(404,'Customer Not Found'));
        }
        res.json(customer);
    
    } catch (error) {
        next(error);
    }
}