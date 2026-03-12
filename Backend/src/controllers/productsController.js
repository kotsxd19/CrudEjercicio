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

