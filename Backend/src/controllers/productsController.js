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


//SELECT BY ID
productsController.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
        
    } 
    catch (error) {
        console.error("Error" + error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Buscar por nombre
productsController.searchByName = async (req, res) => {
    try{
            //#1- Solicitar los datos
            const { name } = req.body;

            const products = await Product.find({
                name: { $regex: name, $options: "i" },
            });

            if(!products){
                return res.status(404).json({message: "products not found"})
            }

            return res.status(200).json(products)
    } catch (error) {
        console-log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Products con stock bajo
productsController.getLowStock = async (req, res) => {
    try{

        const products = await Product.find({stock: { $lt: 5}})

        if(!products){
            return res.status(404).json({message: "Not products with low stock"})
        }

        return res.status(200).json(products)
    }catch{
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Filtro que el usuario coloque
productsController.getProductsByPriceRange = async (req, res) => {
    try{

        //#1- solicito los datos
        const {min, max} = req.body

        const products = await Product.find({
            price: { $gte: min, $lte: max}
        })
        
         return res.status(200).json(products)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Contar cuantos elementos hay en una coleccion
productsController.countProduct = async (req, res) => {
    try{
        const count = await Product.countDocuments();

        return res.status(200).json(count)
    } catch {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default productsController;