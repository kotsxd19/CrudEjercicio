import express from 'express';
import productsController from '../controllers/productsController.js';

//Router() nos ayudara a colocar los metodos
//que tendra el endpoint
const router = express.Router();

router.route("/")
.get(productsController.getProducts)
.post(productsController.createProduct)

router.route("/seacrchByName").post(productsController.searchByName)
router.route("/low-stock").get(productsController.getLowStock)
router.route("/price-range").post(productsController.getProductsByPriceRange)
router.route("/count").get(productsController.countProduct)


router.route("/:id")
.put(productsController.updateProduct)
.delete(productsController.deleteProduct)

export default router;

