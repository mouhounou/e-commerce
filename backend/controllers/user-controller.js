import dotenv from 'dotenv';
dotenv.config();

console.log("JWT_SECRET dans user-controller:", process.env.JWT_SECRET);


import userModel from "../models/userModel.js   ";
import validator from "validator";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const createToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}


const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validate input
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		// Check if user exists
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not found",
			});
		}

		// Check user password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Incorrect password",
			});
		}

		// Create token
		const token = createToken(user._id);

		// Log the token for debugging
		console.log("Generated token:", token);

		// Send response with token
		res.status(200).json({
			success: true,
			message: "User logged in successfully",
			token,
		});
	} catch (error) {
		console.error("Error in loginUser:", error);
		res.status(500).json({
			success: false,
			message: "Server Error",
			error: error.message,
		});
	}
};


// user registration
const userRegister = async (req, res) =>{
    try{

        const { name, email, password } = req.body;
        
        const exist = await userModel.findOne({ email });

        if(exist){
            return res.status(400).json({
                success: false,
                message : 'User already exist'
            });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message : 'Please enter a valid email'
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message : 'Password should be at least 8 characters long'
            });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password : hashedPassword
        })

        const user = await newUser.save()

        // generate token
        const token =  createToken(user._id)
        
        res.status(200).json({
            success: true,
            message : 'User registered successfully',
            token
        })

    } catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message : 'Server Error'
        });
    }

}


const adminLogin = async (req, res) =>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                success: true,
                message: 'Admin logged in successfully',
                token,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
}

const adminRegister = async (req, res) =>{}



export { loginUser, userRegister, adminLogin, adminRegister}