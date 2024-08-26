import mongoose from "mongoose";

// Product schema definition
const productSchema = new mongoose.Schema({
    title: {
        type: String, // Product title
        required: true, // Title is mandatory
        maxlength: 500, // Maximum length of 500 characters
    },
    description: {
        type: String, // Product description
        required: true, // Description is mandatory
        maxlength: 5000, // Maximum length of 5000 characters
    },
    price: {
        type: Number, // Product price
        required: true, // Price is mandatory
    },
    discountPercentage: {
        type: Number, // Discount percentage
        default: 0, // Default value if not provided
    },
    stock: {
        type: Number, // Available stock
        default: 0, // Default value if not provided
    },
    brand: {
        type: String, // Brand name
    },
    rating: {
        type: Number, // Product rating
        default: 0, // Default value if not provided
    },
    categoryName: {
        type: String, // Category name
        ref: 'Category', // Reference to Category collection
    },
    thumbnail: {
        type: String, // URL or path to thumbnail image
    },
    images: [{
        type: String, // Array of image URLs or paths
    }],
}, {
    timestamps: true // Adds `createdAt` and `updatedAt` fields
});

const Product = mongoose.model('Product', productSchema);

export default Product;
