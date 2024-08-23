import express from 'express';
import { AddSupplier, removeSupplier, updateSupplier, ViewAllSupplier } from '../Controller/SupplierController.js';

const router = express.Router();
router.post("/add-supplier",AddSupplier);
router.delete("/removeSupplier/:id",removeSupplier)
router.get("/view-all-supplier",ViewAllSupplier)
router.put("/update-supplier-details",updateSupplier)
export default router;