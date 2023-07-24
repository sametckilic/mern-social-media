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
            pictureBase,
}
            = req.body
    
        const salt =  await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            pictureBase,

        })
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }


};


// Login 

export const login = async (req, res) => {
    try{
        const { email, pwd } = req.body;
        const loginUser = await User.findOne({email: email});
        if(!loginUser) return res.status(400).json({error: "User does not exist"});

        const isMatch = await bcrypt.compare(pwd, loginUser.password);

        if(!isMatch) return res.status(400).json({error: "Invalid credentials"})
        
        const token = jwt.sign({id: loginUser._id}, process.env.JWT_SECRET)

        const {password, ...user} = loginUser._doc; 

        res.status(200).json({token , user});
    }
    catch(err){
        res.status(500).json({error: err.message});

    }
};
