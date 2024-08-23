import express from 'express';
import { generateToken, SignIn, SignUp, updatePassword } from '../Controller/UserController.js';
import VerifyToken from '../Middleware/VerifyToken.js';

const router = express.Router();

router.post("/SignUp",SignUp);
router.post("/signin",VerifyToken,SignIn);
router.post("/generate-token",generateToken);
router.put("/update-password",updatePassword);
export default router