import mongoose, { Schema, Document } from 'mongoose';

interface Product {
    name: string;
    quantity: number;
    rate: number;
}

interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    products: {
        timestamp: Date;
        validUntil: Date;
        items: Product[];
    }[];
}

const ProductSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true }
});

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    products: [{
        timestamp: { type: Date, default: Date.now },
        validUntil: { type: Date, default: () => {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            return date;
        }},
        items: [ProductSchema]
    }]
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export default UserModel;
