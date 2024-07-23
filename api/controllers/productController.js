import Product from "../models/Product.js";
import { errorHandler } from "../utils/error.js";

export const addProduct = async (req, res, next) => {
    if (req.user.access < 3) {
        try {
            const { name, description, price, sellingPrice, discounte } = req.body;

            // Check if all required fields are present
            if (!name || !price || !sellingPrice || !discounte) {
                return res.status(400).json({ message: 'All required fields must be provided' });
            }

            const discountedPrice = sellingPrice;

            if (discounte == -1) {
                discountedPrice = sellingPrice - (sellingPrice * 0.05);
            } else if (discounte == 0) {
                discountedPrice = sellingPrice;
            } else {
                discountedPrice = sellingPrice - discounte;
            }

            const newProduct = new Product({
                name, description, price, sellingPrice, discountedPrice
            });

            const savedProduct = await newProduct.save();
            res.send(savedProduct);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "no permission"));
    }
}

export const deleteProduct = async (req, res, next) => {
    if (req.user.access < 2) {
        try {
            await Product.findByIdAndDelete(req.params.productId);
            res.status(200).json('the product has been deleted ');
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "No permission "));
    }
}

export const updatePrice = async (req, res, next) => {
    if (req.user.access < 3) {
        try {
            const { name, description, price, sellingPrice, discounte } = req.body;

            if (discounte) {
                const discountedPrice = sellingPrice;
                if (discounte == -1) {
                    discountedPrice = sellingPrice - (sellingPrice * 0.05);
                } else if (discounte == 0) {
                    discountedPrice = sellingPrice;
                } else {
                    discountedPrice = sellingPrice - discounte;
                }
                const newProduct = new Product({
                    name, description, price, sellingPrice, discountedPrice
                });
                // const savedProduct = await Employee.findByIdAndUpdate(req.params.empId, {
                //     $set: {
                //         name: req.body.name,
                //         salary: req.body.salary,
                //         mobile: req.body.mobile,
                //         address: req.body.address,
                //         nic: req.body.nic
                //     },
                // }, { new: true });
                res.send(savedProduct);
            }
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "No permission "));
    }
}