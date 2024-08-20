import Product from "../Model/Product.js";
export const addProductInBulk = async (req, res, next) => {
    let productList = req.body;
    try {
        for (let item of productList) {
            let { title, description, price, discountPercentage, rating, stock, brand, thumbnail } = item;
            let categoryName = item.category;
            // Combine images into a single array
            let images = item.images || [];
            // Create and save the product in MongoDB
            const newProduct = new Product({
                title,
                description,
                price,
                discountPercentage,
                rating,
                stock,
                brand,
                thumbnail,
                categoryName,
                images
            });
            await newProduct.save(); // Save the product to MongoDB
        }
        return res.status(200).json({ message: "Products added successfully.." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const viewAllProduct = (req, res, next) => {
    Product.find().then(result => {
        // console.log(result)
        return res.status(200).json({ message: "Products", result });
    }).catch(err => {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    })
}

export const getLowStockProducts = async (req, res, next) => {
    try {
      const lowStockProducts = await Product.find({ stock: { $lt: 10 } });
      return res.status(200).json(lowStockProducts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };