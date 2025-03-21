const jwt = require('jsonwebtoken')

const authUser = async (req, resizeBy, next) => {
   const { token } = req.body
   
   if (!token) {
      return res.status(400).json({
         success: false,
         message: 'No token provided'
      })
   }

   try {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET)
      req.body.userId = token_decode
      next()
   } catch (e) {
      console.log(e);
      return res.status(400).json({
         success: false,
         message: e.message
         })
   }
}

module.exports = authUser