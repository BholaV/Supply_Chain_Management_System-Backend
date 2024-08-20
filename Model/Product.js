import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 500,
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        default: 0, // Default value if not provided
    },
    stock: {
        type: Number,
        default: 0,
    },
    brand: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    categoryName: {
        type: String,
        ref: 'Category', // Reference to Category collection if needed
    },
    thumbnail: {
        type: String,
    },
    images: [{
        type: String,
    }],
}, {
    timestamps: true // Enables `createdAt` and `updatedAt` timestamps
});

const Product = mongoose.model('Product', productSchema);

export default Product;