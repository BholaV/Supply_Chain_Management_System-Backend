import mongoose from "mongoose";

// Supplier schema definition
const SupplierSchema = new mongoose.Schema({
    name: {
        type: String, // Supplier name
        trim: true // Remove extra whitespace
    },
    contact: {
        type: String, // Contact information
        trim: true, // Remove extra whitespace
        unique: true // Ensure uniqueness
    },
    productCategory: {
        type: String, // Category of products supplied
        trim: true // Remove extra whitespace
    }
});

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;
