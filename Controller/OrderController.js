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

