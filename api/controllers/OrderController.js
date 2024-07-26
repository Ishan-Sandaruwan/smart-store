import Order from "../models/Order.js";
import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";

export const createOrder = async (req, res, next) => {
    if (req.user.access > 2) {
        return next(errorHandler(401, "no permission"));
    }

    try {
        const { customerId, products, totalAmount } = req.body;
        if (!products || !totalAmount) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const newOrder = new Order({ customerId, products, totalAmount });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);

    } catch (error) {
        next(error);
    }
}