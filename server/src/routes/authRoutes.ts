import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

// Unprotected routes
router.get('/checkLoggedin', userController.checkLoggedin);
router.post('/register', userController.registerUser); 
router.post('/login', userController.login); 

export default router;
