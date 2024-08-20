import express from 'express';
import { createOrder, viewOrder } from '../Controller/OrderController.js';

const router = express.Router();

router.post("/createOrder",createOrder);
router.post("/viewOrder/:userId",viewOrder)

export default router;