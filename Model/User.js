import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User schema definition
const userSchema = new mongoose.Schema({
    username: {
        type: String, // Username field
        trim: true, // Remove extra whitespace
        unique: true // Ensure uniqueness
    },
    password: {
        type: String, // Password field
        trim: true, // Remove extra whitespace
        set: function(password) { // Hash password before saving
            let saltKey = bcrypt.genSaltSync(10); // Generate salt
            return bcrypt.hashSync(password, saltKey); // Return hashed password
        }
    },
    email: {
        type: String, // Email field
        trim: true, // Remove extra whitespace
        unique: true, // Ensure uniqueness
        lowercase: true // Convert to lowercase
    }
}, { versionKey: false }); // Disable version key (__v)

const User = mongoose.model("User", userSchema);

// Static method to compare passwords
User.checkPassword = (password, encryptedPassword) => {
    return bcrypt.compareSync(password, encryptedPassword); // Compare plain and hashed passwords
}

export default User;
