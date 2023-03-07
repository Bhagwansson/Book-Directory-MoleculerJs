// const authMixin = {
// 	methods: {
// 		async authenticate(ctx, req, next) {
// 			// Read the token from header
// 			const auth = req.headers.authorization;
// 			// ctx.meta.token = auth
// 			// console.log("this is auth", ctx.meta.token)

// 			if (!auth || !auth.startsWith("Bearer")) {
// 				throw new MoleculerError("Authentication Invalid", 401);
// 			}
// 			const token = auth.split(" ")[1];
// 			try {
// 				const payload = jwt.verify(
// 					token,
// 					process.env.JWT_ACCESS_TOKEN_SECRET,
// 					process.env.JWT_AT_LIFETIME
// 				);
// 				ctx.meta.user = payload.userId;
// 				ctx.meta.role = payload.role;
// 				next();
// 			} catch (error) {
// 				if (error.name === "TokenExpiredError") {
// 					throw new MoleculerError("The token has expired", 401);
// 				}
// 				throw new MoleculerError(
// 					"Not authorized to access this route",
// 					401
// 				);
// 			}
// 		},
// 		created() {
// 			this.addHook("before", this.authenticate);
// 		},
// 	},
// };


// module.exports = authMixin;



