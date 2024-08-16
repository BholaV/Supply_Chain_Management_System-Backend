import jwt from 'jsonwebtoken';

const VerifyToken = (req,res,next)=>{
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    try{
        jwt.verify(token,process.env.SECRET_KEY);
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Unathorized User.." });
    }
}
export default VerifyToken;