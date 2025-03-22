import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


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
   
}

const placeOrderRazorpay = async (req, res) =>{}


// for admin panel
const allOrders = async(req, res) =>{}


// UserOrderData for frontend
const userOrders = async(req, res) =>{}

// update order status from admin
const updateStatus = async(req, res) =>{}


export {
   placerOrder,
   placerOrderStripe,
   placeOrderRazorpay,
   userOrders,
   updateStatus,
   allOrders,
   
};