import express from 'express';
import { createOrder, removeOrder, updateOrder, viewOrder } from '../Controller/OrderController.js';

const router = express.Router();

router.post("/create-order",createOrder); //Create Order
router.get("/viewOrder/:userId",viewOrder) //View Order
router.delete("/removeOrder/:orderId",removeOrder); //Delete Order
router.put("/updateOrder/:id",updateOrder); //Update Order 

export default router;