import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({
				success: false,
				message: "Access denied. No token provided.",
			});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("Decoded token:", decoded);

		req.userId = decoded.id; 
		next();
	} catch (error) {
		res.status(401).json({ success: false, message: "Invalid token." });
	}
};

export default authUser;
