import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

// global variables
const currency = "inr"
const DeliveryCharges = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// using cod
const placerOrder = async (req, res) => {
   try {
      
      const  {items, amount, address } = req.body
      const userId = req.userId;
      
      const orderData = {
			userId,
         items,
         address,
			amount,
			paymentMethod: "COD",
         payment: false,
         date : Date.now()
      }

      const newOrder = new orderModel(orderData)
      await newOrder.save()

      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      
      res.status(200).json({
         success: true,
         message : "Order Placed"
      })

   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         success: false,
         message: "Erreur du paiement ",
         err : error.message
      })
   }
}


// using cod
const placerOrderStripe = async (req, res) => {
   try {
      const  {items, amount, address } = req.body
      const userId = req.userId;
      const { origin } = req.headers
      
      const orderData = {
			userId,
			items,
			address,
			amount,
			paymentMethod: "Stripe",
			payment: false,
			date: Date.now(),
      };
      
      const newOrder = new orderModel(orderData);
      await newOrder.save();

      const line_items = items.map((item) => ({
         price_data: {
            currency: currency,
            product_data: {
               name: item.name,
            },
            unit_amount: item.price * 100,
         },
         quantity: item.quantity,
      }))

      line_items.push({
			price_data: {
				currency: currency,
				product_data: {
					name: "Delivery charges",
				},
				unit_amount: DeliveryCharges  * 100,
			},
			quantity: 1
      });
      
      const session = await stripe.checkout.sessions.create({
			success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
         cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
         line_items,
         mode: "payment",
      });
      
      res.status(200).json({
         success: true,
         message: "Order Placed",
         session_url: session.url,
      });

   } catch (error) {
      console.log(error.message);
		res.status(500).json({
			success: false,
			message: "Erreur du paiement ",
			err: error.message,
		});
   }
}

const placeOrderRazorpay = async (req, res) =>{}


// for admin panel
const allOrders = async (req, res) => {
   try { 
      const orders = await orderModel.find({})

      if (!orders) {
         return res.status(404).json({
            success: false,
            message: "No orders found"
         })
      }

      res.status(200).json({
         success: true,
         message : "orders found successfuly",
         orders
      })
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         success: false,
         message: "Erreur de récupération des commandes",
         err : error.message
      })
      
   }
}


// UserOrderData for frontend
const userOrders = async (req, res) => {
   try {
      const userId = req.userId;
      const orders = await orderModel.find({ userId });

      res.status(200).json({
         success: true,
         message: "orders found succesfully",
         orders
      })
      
   } catch (error) {
      console.log(
         "Error in userOrders function",
         error.message
      );
      res.status(500).json({
         success: false,
         message: "Erreur de récupération des données",
         err : error.message
      })
      
   }
}

// update order status from admin
const updateStatus = async (req, res) => {
   try {
      const { orderId, status } = req.body;  
      await orderModel.findByIdAndUpdate(orderId, { status });
      
      res.status(200).json({
         success: true,
         message: "Order status updated successfully",
      })

   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         success: false,
         message: "Erreur de mise à jour de la commande",
         err : error.message
      })
      
   }
}


export {
   placerOrder,
   placerOrderStripe,
   placeOrderRazorpay,
   userOrders,
   updateStatus,
   allOrders,
   
};