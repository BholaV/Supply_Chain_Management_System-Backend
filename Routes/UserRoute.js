import express from 'express';
import { SignIn, SignUp } from '../Controller/UserController.js';
import VerifyToken from '../Middleware/VerifyToken.js';

const router = express.Router();

router.post("/SignUp",SignUp);
router.post("/signin",SignIn);

export default router