import express from 'express';
import { addProductInBulk, addStock, getLowStockProducts, removeStock, viewAllProduct } from '../Controller/ProductController.js';
const router = express.Router();

router.post("/addProductInBulk", addProductInBulk)
router.get("/viewAllProduct", viewAllProduct);
router.get("/fetchLowStockProducts",getLowStockProducts);
router.delete("/removeStock/:productId",removeStock)
router.post("/addStock/:productId",addStock)
export default router;