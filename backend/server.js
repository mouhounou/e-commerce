import dotenv from 'dotenv';
dotenv.config();


console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user-route.js';
import productRouter from './routes/product-routes.js';
import cartRouter from './routes/cart-routes.js';
import orderRouter from './routes/order-route.js';



// app config
const app = express();
const port = process.env.PORT || 5000;

// db connection
connectDB()

//cloudinary
connectCloudinary()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// api endpoint
app.use('/api/user', userRouter)
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// listen
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))