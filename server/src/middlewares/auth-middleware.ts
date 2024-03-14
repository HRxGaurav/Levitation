import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const checkAuthUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
        
    if (!token) {
        return res.status(401).json({ status: "failed", message: "Unauthorized" });
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error('JWT secret key is not provided');
        }
    
        const decodedToken = jwt.verify(token, secretKey as Secret) as JwtPayload;
    
        if (!decodedToken.userId || typeof decodedToken.userId !== 'string') {
            throw new Error('Invalid token format: userId missing or not a string');
        }
    
        // Get user from Token
        req.user = decodedToken.userId;
        next();
    
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token: ' + error.message });
    }
}


export default checkAuthUser;
