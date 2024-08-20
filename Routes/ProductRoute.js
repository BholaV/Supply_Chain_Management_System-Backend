import express from 'express';
import { addProductInBulk, getLowStockProducts, viewAllProduct } from '../Controller/ProductController.js';
const router = express.Router();

router.post("/addProductInBulk", addProductInBulk)
router.get("/viewAllProduct", viewAllProduct);
router.get("/fetchLowStockProducts",getLowStockProducts)
export default router;