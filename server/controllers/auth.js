import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Register

export const register = async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location }
            = req.body
    
        const salt =  await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            viewedProfile:0,
        })
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }


};


// Login 


