import userModel from "../models/userModel.js";

// Middleware to validate user existence
const validateUser = async (userId) => {
	const user = await userModel.findById(userId);
	if (!user) {
		throw new Error("User not found");
	}
	return user;
};


const addToCart = async (req, res) => {
	try {
		console.log("User ID from token:", req.userId); 

		const { itemId, size } = req.body;
		const userId = req.userId; 

		if (!itemId || !size) {
			return res
				.status(400)
				.json({
					success: false,
					message: "Missing required fields: itemId or size",
				});
		}

		const user = await validateUser(userId);
		const cartData = user.cartData || {};

		// Mise à jour du panier
		if (cartData[itemId] && cartData[itemId][size]) {
			cartData[itemId][size] += 1;
		} else {
			if (!cartData[itemId]) cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}

		await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

		res.status(200).json({
			success: true,
			message: "Product added to cart successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to add product to cart",
			error: error.message,
		});
	}
};




// Update product quantity in user cart
const updateCart = async (req, res) => {
	try {
		const {itemId, size, quantity } = req.body;
		const userId = req.userId; 

		if (
			!userId ||
			!itemId ||
			!size ||
			quantity === undefined ||
			quantity < 0
		) {
			return res.status(400).json({
				success: false,
				message:
					"Missing or invalid fields: userId, itemId, size, or quantity",
			});
		}

		const user = await validateUser(userId);
		const cartData = user.cartData || {};

		if (!cartData[itemId] || !cartData[itemId][size]) {
			return res.status(404).json({
				success: false,
				message: "Item or size not found in cart",
			});
		}

		cartData[itemId][size] = quantity;

		await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

		res.status(200).json({
			success: true,
			message: "Cart updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to update cart",
			error: error.message,
		});
	}
};



// Get user cart data
const getUserCart = async (req, res) => {
	try {
		const userId = req.userId; 

		// Validate input
		if (!userId) {
			return res.status(400).json({
				success: false,
				message: "Missing required field: userId",
			});
		}

		const user = await validateUser(userId);
		const cartData = user.cartData || {};

		res.status(200).json({
			success: true,
			message: "Cart data retrieved successfully",
			cartData,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to retrieve cart data",
			error: error.message,
		});
	}
};

export { addToCart, getUserCart, updateCart };
