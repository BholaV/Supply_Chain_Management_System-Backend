import jwt from 'jsonwebtoken';

const VerifyToken = (req, res, next) => {
    const token = req.body.token || req.headers['authorization']?.split(' ')[1]; // Support for token in headers

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized user" });
    }
};

export default VerifyToken;
