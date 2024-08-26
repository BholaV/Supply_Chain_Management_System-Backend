import User from "../Model/User.js";
import jwt from 'jsonwebtoken';

// User Sign Up
export const SignUp = async (req, res, next) => {
    console.log(req.body);
    const data = await User.findOne({ email: req.body.email });
    if (data)
        return res.status(201).json({ message: "User already exist", data });
    else
       await User.create(req.body)
            .then((user) => {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
                return res.status(201).json({ message: "User created successfully", user, token });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ message: "Error creating user" });
            });
};

// User Sign In
export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        const isPasswordValid = await User.checkPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        return res.status(200).json({ message: "User signed in successfully", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Update Password
export const updatePassword = async (req, res, next) => {
    try {
        const { email, password, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized Supplier..." });
        }
        const isPasswordCorrect = await user.checkPass(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password does not match" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// Generate Token
export const generateToken = (req, res, next) => {
    const { email } = req.body;
    const payload = { email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
    console.log(`${email} ${token}`);
    return res.status(200).json({ message: "Token created successfully..", token });
}
