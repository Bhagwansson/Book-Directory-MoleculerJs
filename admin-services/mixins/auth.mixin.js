// const Admin = require("../models/adminModel");
const { MoleculerError } = require("moleculer").Errors;
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	name: "authMixin",
	methods: {
		authenticate: async (ctx) => {
			// try {
			// 	console.log("Authenticating");

			// 	const payload = jwt.verify(
			// 		ctx.meta.token,
			// 		process.env.JWT_ACCESS_TOKEN_SECRET,
			// 		process.env.JWT_AT_LIFETIME
			// 	);

			// 	const userRole = await ctx.call(
			// 		"validator.validate",
			// 		payload.userId
			// 	);

			// 	ctx.meta.userRole = userRole.userRole;
			// 	ctx.meta.userId = payload.userId;
			// 	console.log(payload.iat);
			// 	console.log(userRole.pwUat);

			// 	try {
			// 		if (payload.iat > userRole.pwUat) {
			// 			console.log("here");
			// 			return "valid";
			// 		}
			// 	} catch (error) {
			// 		throw new MoleculerError("Please login again", 401);
			// 	}
			// } catch (error) {
			// 	if (error.name === "TokenExpiredError") {
			// 		throw new MoleculerError("The token has expired", 401);
			// 	}
			// 	console.log(error.code);
			// 	throw new MoleculerError(
			// 		"Not authorized to access this route",
			// 		401
			// 	);
			// }

			/** Refactored version of the above commented code */

			// Verify the token
			let payload;
			try {
				payload = jwt.verify(
					ctx.meta.token,
					process.env.JWT_ACCESS_TOKEN_SECRET,
					process.env.JWT_AT_LIFETIME
				);
			} catch (error) {
				if (error.name === "TokenExpiredError") {
					throw new MoleculerError("The token has expired", 401);
				} else {
					throw new MoleculerError(
						"Not authorized to access this route",
						401
					);
				}
			}

			// Get the user role
			let userRole;
			try {
				userRole = await ctx.call("validator.validate", payload.userId);
			} catch (error) {
				throw new MoleculerError("Error getting user role", 500);
			}

			// Check if the token was issued before the user's password was updated
			if (payload.iat < userRole.pwUat) {
				throw new MoleculerError("Please login again", 401);
			}

			// Set the user role and user ID in the meta
			ctx.meta.userRole = userRole.userRole;
			ctx.meta.userId = payload.userId;
			return "valid";
		},

		authorization: (ctx) => {
			console.log("Authorizing");

			if (ctx.meta.auth !== ctx.meta.userRole) {
				throw new MoleculerError(
					"You are not authorized to access this route ",
					401
				);
			}
			return "done";
		},
	},
};

// module.exports = { authMixin };
