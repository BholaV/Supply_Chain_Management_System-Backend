import express from 'express';
import { SignIn, SignUp, updatePassword } from '../Controller/UserController.js';
import VerifyToken from '../Middleware/VerifyToken.js';

const router = express.Router();

router.post("/SignUp",SignUp);
router.post("/signin",SignIn);
router.put("/updatePassword",updatePassword);
export default router