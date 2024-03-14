import { Request, Response } from 'express';
import UserModel from '../models/user';
import jwt from "jsonwebtoken";

const addProduct = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    const items = req.body;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        const userId : string = decoded.userId;
        

       
        if (!userId || typeof userId !== 'string') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const timestamp = new Date();
        const validUntil = new Date();
        validUntil.setMonth(validUntil.getMonth() + 1);

        
        user.products.push({ timestamp, validUntil, items });

        await user.save();

        const newProduct = user.products[user.products.length - 1];

        res.status(200).json({ product: newProduct });
    } catch (error) {
        console.error('Error adding products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProducts = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
    
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        const userId : string = decoded.userId;

        
        if (!userId || typeof userId !== 'string') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        res.status(200).json(user.products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    
    try {
        const user = await UserModel.findOne({ 'products._id': productId });

        if (!user) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the product by its ID
        const product = user.products.flat().find(product => product._id.toString() === productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default { addProduct, getProducts, getProductById };
