import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }, description: {
        type: String,
    }, category: {
        type: String,
        required: true,
        default: "null"
    }, price: {
        type: Number,
        required: true,
    }, sellingPrice: {
        type: Number,
        required: true,
    }, discountedPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productShema);

export default Product;