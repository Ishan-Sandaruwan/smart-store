import Product from "../models/Product.js";
import { errorHandler } from "../utils/error.js";

export const addProduct = async (req, res, next) => {
    if (req.user.access < 3) {
        try {
            const { name, description, category, price, sellingPrice, discounte } = req.body;

            // Check if all required fields are present
            if (!category || !name || !price || !sellingPrice || !discounte) {
                return res.status(400).json({ message: 'All required fields must be provided' });
            }
            let discountedPrice = sellingPrice;
            if (discounte == -1) {
                discountedPrice = sellingPrice - (sellingPrice * 0.05);
            } else if (discounte == 0) {
                discountedPrice = sellingPrice;
            } else {
                discountedPrice = sellingPrice - discounte;
            }
            const newProduct = new Product({
                name, description, category, price, sellingPrice, discountedPrice
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
            const { name, description, category, price, sellingPrice, discounte } = req.body;
            if (discounte) {
                const discountedPrice = sellingPrice;
                if (discounte == -1) {
                    discountedPrice = sellingPrice - (sellingPrice * 0.05);
                } else if (discounte == 0) {
                    discountedPrice = sellingPrice;
                } else {
                    discountedPrice = sellingPrice - discounte;
                }
                const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, {
                    $set: { name, description, category, price, sellingPrice, discountedPrice }
                }, { new: true });
                res.json(updatedProduct);
            }else{
                const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, {
                    $set: { name, description, category }
                }, { new: true });
                res.json(updatedProduct);  
            }
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "No permission "));
    }
}
// Controller function to get a product by ID
export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
}

// Controller function to get products by category
export const getProductByCate = async (req, res, next) => {
    try {
        const productList = await Product.find({ category: req.query.category });

        if (productList.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        res.json(productList);
    } catch (error) {
        next(error);
    }
}
