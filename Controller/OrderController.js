import Order from "../Model/Order.js"

export const createOrder = (req,res,next)=>{
    Order.create(req.body).then(result=>{
        res.status(200).json({message:'Order placed successfully...',result})
    }).catch(err=>{
        console.log(err);
        res.status(401).json({message:'Internal server error...'})
    });
}


 export const viewOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Find orders by userId and populate the user and product details
        const orders =  await Order.find({ userId: userId })
            .populate('userId')   
            .populate('productId') 
            .exec();
        
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

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


export const removeOrder = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    try {
        const product = await Order.findOneAndDelete({ _id: id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" ,product});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting supplier" });
    }
};