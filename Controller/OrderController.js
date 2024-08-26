import Order from "../Model/Order.js";

// Create a new order
export const createOrder = (req, res, next) => {
    Order.create(req.body)
        .then(result => {
            res.status(200).json({ message: 'Order placed successfully...', result });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: 'Internal server error...' });
        });
};

// View orders by user ID
export const viewOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Find orders by userId and populate user and product details
        const orders = await Order.find({ userId: userId })
            .populate('userId')   
            .populate('productId') 
            .exec();
        
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update order status by order ID
export const updateOrder = (req, res, next) => {
    const orderId = req.params.id;
    const newStatus = req.body.status;
    Order.findByIdAndUpdate(orderId, { $set: { status: newStatus } }, { new: true })
        .then((updatedOrder) => {
            if (!updatedOrder) {
                res.status(404).json({ message: 'Order not found' });
            } else {
                res.status(200).json({ message: 'Order updated successfully', updatedOrder });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
};

// Remove an order by ID
export const removeOrder = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
        const order = await Order.findOneAndDelete({ _id: id });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Order deleted successfully", order });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting order" });
    }
};
