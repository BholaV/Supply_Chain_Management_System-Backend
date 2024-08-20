import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Order Confirmed', 'Order Shipped', 'Out for delivery', 'Delivered'], default: 'Order Confirmed' }

});

const Order = mongoose.model("Order", OrderSchema);
export default Order;