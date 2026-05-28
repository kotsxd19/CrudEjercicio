
import cartModal from "../models/cart.js"
import productModal from "../models/product.js"

//Array de funciones
const cartController = {}

//SELECT
cartController.getAllCarts = async (req, res) => {
    try{
        const carts = await cartModal.find().populate("customerId", "name email").populate("product.productId", "name price")

        return res.status(200).json(carts)
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interanl error"})
    }
}


//SELECT by id
cartController.getCartById = async (req, res) => {
    try{
        const cart = await cartModal.findById(req.params.id).populate("customerId", "name email").populate("product.productId", "name price")

        return res.status(200).json(cart)
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interanl error"})
    }
}

//INSERT
cartController.insertCart = async (req, res) => {
    try{
        //#1- solicito los datos a ingresar
        const {customerId, products, status} = req.body;

        ///////////CALCULAR EL SUBTOTAL Y TOTA/////////////

        //Variable para guardar el total a pagar
        let total = 0;

        //Arreglo de productos
        let newProducts = [];

        //De todos los producot, voy a recorrer uno por uno calculando el subtotal y el total a pagar
        for (let i = 0; i < products.length; i++){
            //Buscamos el producto en la base de datos
            const productFound = await productModal.findById(products[i].productId)

            //Calcular el subtotal
            const subtotal = productFound.price * products[i].quantity


            //Calcular el total
            total += subtotal

            //guardams el producto junto con la cantidad y el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        //Guardamos todo en la base de datos
        const newCart = new cartModal({
            customerId,
            products: newProducts,
            total,
            status
        })

        await newCart.save()
        
        return res.status(200).json({message: "Cart save"})

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interanl error"})
    }
}

//UPDATE 
cartController.updateCart = async (req, res) => {
    try{

        //#1- solicitamos los datos que vamos a actualizar
        const {customerId, products, status} = req.body;

        //CALCULAR EL SUBTOTAL Y TOTAL///
        let total = 0

        let newProducts = []

        for(let i = 0; i < products.length; i++){
            //Buscar el producto
            const productFound = await productModal.findById(products[i].productId)
            //Calculamos el subtotal
            const subtotal = productFound.price * products[i].quantity
            //calculamos el total
            total += subtotal
            //Guardamos el producto junto con el subtotal y la cantidad
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        //Actualizo en la base de datos
        const updatedCart = await cartModal.findByIdAndUpdate(
            req.params.id,{
                customerId,
                products: newProducts,
                total,
                status
            },
            {new: true}
        )

        return res.status(200).json({message: "cart update"})

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interanl error"})
    }
}

//ELIMINAR
cartController.deleteCart  =async (req, res) => {
    try{
        const deleteCart = await cartModal.findByIdAndDelete(req.params.id)

        if(!deleteCart){
            return res.status(404).json({message: "Cart not found"})
        }

        return res.status(200).json({message: "Cart deleted"})

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interanl error"})
    }
}

export default cartController;