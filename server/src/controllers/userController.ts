import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import User from '../models/user';
import { Request, Response } from 'express';

dotenv.config();

const checkLoggedin = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        res.status(200).json({ message: 'success', user: decoded.userID });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const registerUser = async (req: Request, res: Response) => {
    try {
        let { name, email, password } = req.body;

        
        email = email.toLowerCase();

       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const generateToken = (userId: string) => {
    try {
        const payload = { userId };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: '7d' });        
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

const login = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;


        email = email.toLowerCase();


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email or password incorrect' });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email or password incorrect' });
        }


        const token = generateToken(user._id);

        res.status(200).json({ token, name: user.name, userId: user._id });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export default { checkLoggedin, registerUser, login };
