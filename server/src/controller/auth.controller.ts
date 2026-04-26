import {Response, Request} from "express";
import User from "../model/user.model";
import mongoose from "mongoose";
import { hashSHA256, generateSalt} from "../utils/hashUtils";
import jwt, { SignOptions } from 'jsonwebtoken';

import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env";


type UserCrendentials = {
    name: string;
    email: string;
    password: string;
}


const SECRET: string = JWT_SECRET || ""
const EXPIRES_IN: SignOptions["expiresIn"] =
  (JWT_EXPIRES_IN ?? "1h") as SignOptions["expiresIn"];

  
export const signUp = async (req: Request, res: Response) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
         const {name, email, password}: UserCrendentials = req.body as UserCrendentials

        if(!name || !email || !password) {
            return res.status(400).json({message: "All fields are required."})
        }

        if (!JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured." });
        }

        const isExistingUser = await User.findOne({email})

        if(isExistingUser) {
            return res.status(400).json({message: "User with this email already exists."})
        }


        // Hashing Logic
        const salt = generateSalt()
        const hashedPassword = hashSHA256(password, salt)

        const newUsers = await User.create([{name, email, password: hashedPassword, salt}], {session})

          const token = jwt.sign({userId: newUsers[0]._id}, SECRET, {expiresIn: EXPIRES_IN})
        

        await session.commitTransaction()

        res.status(201).json({message: "User created successfully.", user: newUsers[0], token})
    } catch (error) {
        await session.abortTransaction()
        res.status(500).json({message: "Error occurred while creating user."})
    }
}


export const signIn = async (req: Request, res: Response) => {

    try {
         const {email, password}: Pick<UserCrendentials, 'email' | 'password'> = req.body as Pick<UserCrendentials, 'email' | 'password'>

        if(!email || !password) {
            return res.status(400).json({message: "All fields are required."})
        }

        if (!JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured." });
        }


        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: "User not found"})
        }

        const hashedInputPassword = hashSHA256(password, user.salt)

        if(hashedInputPassword !== user.password) {
            return res.status(400).json({message: "Invalid password"})
        }

        const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: EXPIRES_IN });

        res.status(201).json({message: "User signed in successfully.", user, token})
    } catch (error) {
      
        res.status(500).json({message: "Error occurred while creating user."})
    }
}