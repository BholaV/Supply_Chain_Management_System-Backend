import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    contact:{
        type:String,
        trim:true,
        unique:true
    },
    productCategory:{
        type:String,
        trim:true
    }
});

const Supplier = mongoose.model("Supplier",SupplierSchema);
export default Supplier;