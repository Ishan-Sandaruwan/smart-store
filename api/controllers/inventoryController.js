import Inventory from "../models/Inventory.js";
import Product from "../models/Product.js";
import { errorHandler } from "../utils/error.js";

export const addNewStock = async (req, res, next) => {
    if (req.user.access < 3) {
        return next(errorHandler(401, "no permission"));
    }

    try {
        const { productId, stockQuantity } = req.body;
        if (!productId || !stockQuantity) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return next(errorHandler(404, 'product not found'));
        }

        const newInventory = new Inventory({ productId, stockQuantity });
        const savedInventory = await newInventory.save();
        res.status(201).json(savedInventory);
    } catch (error) {
        next(error);
    }
};

export const checkInventoryOfOne = async (req, res, next) => {
    if (req.user.access < 3) {
        return next(errorHandler(401, "No permission"));
    }

    try {
        const inventory = await Inventory.findOne({ productId: req.params.productId });
        if (!inventory) {
            return next(errorHandler(404, "product not found"));
        }
        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
};

export const checkInventoryOfAll = async (req, res, next) => {
    if (req.user.access < 3) {
        return next(errorHandler(401, "No permission"));
    }

    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
};

export const reduceQuantity = async (req, res, next) => {
    if (req.user.access < 3) {
        return next(errorHandler(401, "No permission"));
    }

    try {
        const inventory = await Inventory.findOne({ productId: req.params.productId });
        if (!inventory) {
            return next(errorHandler(404, "product not found"));
        }

        if (inventory.stockQuantity === 0 || inventory.stockQuantity < req.body.count) {
            return next(errorHandler(500, "out of stock"));
        }

        inventory.stockQuantity -= req.body.count;
        const updatedInventory = await inventory.save();
        res.status(200).json(updatedInventory);
    } catch (error) {
        next(error);
    }
};

export const addStock = async (req, res, next) => {
    if (req.user.access < 3) {
        return next(errorHandler(401, "No permission"));
    }

    try {
        const inventory = await Inventory.findOne({ productId: req.params.productId });
        if (!inventory) {
            return next(errorHandler(404, "product not found"));
        }

        inventory.stockQuantity += req.body.count;
        const updatedInventory = await inventory.save();
        res.status(200).json(updatedInventory);
    } catch (error) {
        next(error);
    }
};
export const getLow = async (req, res, next) => {
    if (req.user.access >= 3) {
        return next(errorHandler(401, "No permission"));
    }

    try {
        const inventory = await Inventory.find({ stockQuantity: { $lte: 10 } });
        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
};
