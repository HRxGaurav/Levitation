import express from "express";
import productController from "../controllers/productController";
import checkAuthUser from "../middlewares/auth-middleware";

const router = express.Router();

// Unprotected routes





//Protected routes
router.post('/add_product', checkAuthUser, productController.addProduct); 
router.get('/get_product_by_id/:id', checkAuthUser,  productController.getProductById);
router.get('/get_products',checkAuthUser, productController.getProducts);  

export default router;
