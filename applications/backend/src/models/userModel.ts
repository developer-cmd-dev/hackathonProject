import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    avatar?: string;
    googleId?: string;
    provider: 'google';
    createdAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        avatar: { type: String },
        googleId: { type: String, unique: true, sparse: true },
        provider: { type: String, enum: ['google'], default: 'google' },
    },
    { timestamps: true }
);

export const User = model<IUser>('User', userSchema);