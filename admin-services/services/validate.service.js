const Admin = require("../models/adminModel.js");
const { MoleculerError } = require("moleculer").Errors;
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	name: "validator",
	actions: {
		validate: {
			async handler(ctx) {
				// console.log(ctx.params)
				const user = await Admin.findById(ctx.params);
				const userRole = user.role;
				console.log(userRole)
				const pwUat = user.pwUat;
				return {userRole, pwUat};
			},
		},
		// resolveToken: {
		// 	async handler(ctx) {
		// 		const token = ctx.params;
		// 		try {
		// 			const payload = jwt.verify(
		// 				token,
		// 				process.env.JWT_ACCESS_TOKEN_SECRET,
		// 				process.env.JWT_AT_LIFETIME
		// 			);
		// 			// ctx.meta.user = `ObjectId('${payload.userId}')`;
		// 			ctx.meta.userId = payload.userId;
		// 			return await ctx.call(
		// 				"validator.validate",
		// 				ctx.meta.userId
		// 			);
		// 			// return route;
		// 		} catch (error) {
		// 			if (error.name === "TokenExpiredError") {
		// 				throw new MoleculerError("The token has expired", 401);
		// 			}
		// 			throw new MoleculerError(
		// 				"Not authorized to access this route",
		// 				401
		// 			);
		// 		}
		// 	},
		// },
	},
};
