const Product = require("../models/Product");

module.exports = {
// Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Get products byID
  getProductById: async(req, res) =>{
    try{
      const name = req.params.name;
      const categories = req.params.category;
      const product = await Product.find(name || categories);
      if(!product){
        return res.status(404).json({message:"Sản phẩm không tồn tại"})
      }
      res.status(200).json(productById)
    }catch{
      res.status(500).json({ message: error.message });
    }
  }

}