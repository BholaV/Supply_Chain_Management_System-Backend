import User from "../Model/User.js";
import jwt from 'jsonwebtoken';

//User Sign up
export const SignUp = async(req, res, next) => {
    console.log(req.body);
    const data = await User.findOne({ email: req.body.email });
    if (data)
        return res.status(201).json({ message: "User already exist", data });
    else
       await User.create(req.body)
            .then((user) => {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY,{expiresIn:'30d'});
                return res.status(201).json({ message: "User created successfully", user,token });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ message: "Error creating user" });
            });
};

//User Sign in
export const SignIn = async (request, response, next) => {
    // console.log(req.body)
    try {
        let user = await User.findOne({ email: request.body.email });
        if (user) {
            return user ? User.checkPassword(request.body.password, user.password) ? response.status(200).json({ message: "User Sign In successfully...", user })
                : response.status(401).json({ error: "Bad request (Invalid password)" })
                : response.status(401).json({ error: "Bad request (Unauthorized user)" });
        }
        return response.status(401).json({ error: "Bad request (Unauthorized user)" });
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal server error" });
    }
}
