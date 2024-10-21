const jwt = require("jsonwebtoken");
const AdminModel = require("../Models/admin");

const IsAdmin = async (req, res, next) => {
	// const auth = req.headers["Authorization"];

	const authHeader = req.headers["authorization"];
	if (authHeader && authHeader.startsWith("Bearer ")) {
		const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const res = await AdminModel.findOne({ _id: decoded._id });

			if (!res) {
				return res.status(403).json({ message: "Unauthorised Access" });
			}
			req.adminId = res._id;
			console.log(req.adminId);
			next();
		} catch (err) {
			return res.status(401).json({
				message: "Unauthorised, JWT token is wrong or expired",
			});
		}
	} else {
		// Handle the case where there is no token or invalid format
		res.status(401).json({
			message: "Authorization token missing or invalid",
		});
	}

	// if (!auth) {
	// 	return res
	// 		.status(403)
	// 		.json({ message: "Unauthorised, JWT token is required" });
	// }
};

module.exports = { IsAdmin };