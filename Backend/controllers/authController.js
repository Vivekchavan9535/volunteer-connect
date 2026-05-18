import mongoose from "mongoose";
import User from "../model/userSchema.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }


        //Storing hashed password in db
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id, role: user.role, }, process.env.JWT_SECRET_KEY)

        res.status(201).json({
            message: "Signup successful",
            token,
            user,
        });

    } catch (error) {
        res.status(500).json(error.details)
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(404).json({
                message: "Invalid credentials"
            })
        }

       const token = jwt.sign({ id: user._id, role: user.role, }, process.env.JWT_SECRET_KEY)

        res.status(200).json({
            message: "Login successful",
            token,
            user,
        });


    } catch (error) {
        res.status(500).json(error.details)
    }
}

