const jwt = require("jsonwebtoken");
const { jwtSecret } = require('../config/config');

module.exports = (req, res, next) => {
	
	 // * Get the token from the authorization header.
	 // * Verify the token.
	 

	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, jwtSecret, (error, decodedToken) => {
			if (error) {
				res.status(401).json({ Message: "Invalid Token." });
			} else {
				req.jwtToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(400).json({ Message: "No Token." });
	}
};