import express from "express";
import {
	placerOrder,
	placerOrderStripe,
	placeOrderRazorpay,
	userOrders,
	updateStatus,
	allOrders,
} from '../controllers/order-controller.js'
import authUser from "../middleware/auth.js";


const orderRouter = express.Router()

orderRouter.get('/list', allOrders)
orderRouter.post('/status', updateStatus)

// payement Features
orderRouter.post("/place", authUser, placerOrder);
orderRouter.post("/stripe", authUser, placerOrder);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// feature
orderRouter.get("/userOrders", authUser, userOrders);


export default orderRouter;