import express from 'express';
import { AddSupplier, DeleteSupplier, ViewAllSupplier } from '../Controller/SupplierController.js';

const router = express.Router();
router.post("/addSupplier",AddSupplier);
router.delete("/removeSupplier",DeleteSupplier);
router.get("/allSuppliers",ViewAllSupplier)
export default router;
