import express from 'express';
import { addProductInBulk, addStock, checkStock, getLowStockProducts, removeStock, viewAllProduct } from '../Controller/ProductController.js';
const router = express.Router();

router.post("/add-product-in-bulk", addProductInBulk)
router.get("/view-all-products", viewAllProduct);
router.get("/fetch-low-stock-products",getLowStockProducts);
router.delete("/removeStock/:productId",removeStock);
router.post("/addStock/:productId",addStock);
router.get("/checkStock/:productId",checkStock)
export default router;