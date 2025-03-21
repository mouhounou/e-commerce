import userModel from '../models/userModel'


// add product to user cart
const addToCart = async (req, res) => {
   try {
      const { userId, itemId, size } = req.body
      
      const userData = await userModel.findById(userId)
      let cartData = await userData.cartData

      if (cartData) {
         if (cartData[itemId][size]) {
            cartData[itemId][size] += 1
         } else {
            cartData[itemId][size] = 1
         }
      } else {
         cartData[itemId] = {}
         cartData[itemId][size] = 1
      }

      await userModel.f

      if (!user) {
         return res.status(404).json({
            success : false,
            message: 'User not found'
         })
      }
   } catch (error) {
      
   }
}


// update product to user cart
const updateCart = async (req, res) => {
   
}


// get user  car data
const getUserCart = async (req, res) => {
   
}

module.exports = {
   addToCart,
   getUserCart,
   updateCart
}