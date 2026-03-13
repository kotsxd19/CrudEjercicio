//Creo un array de metodos
const productsController = {};

//Import del Schema de la coleccion
import Product from "../models/product.js";

//SELECT
productsController.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

//INSERT
productsController.createProduct = async (req, res) => {
    //1- Solicitamos los datos del producto a crear
    const { name, description, price, stock } = req.body;
    const newProduct = new Product({name, description, price, stock});
    await newProduct.save();
    res.json({ message: "Producto save" });
};

//ELMINAR
productsController.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto deleted" });
}

//UPDATE
productsController.updateProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, description, price, stock },{ new: true })
    res.json({ message: "Producto updated" });
}

export default productsController;