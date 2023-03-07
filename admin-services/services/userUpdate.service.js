const Admin = require("../models/adminModel");
const authMixin = require("../mixins/auth.mixin");
const bcrypt = require("bcryptjs");
module.exports = {
	name: "userUpdate",
	mixins: [authMixin],
	hooks: {
		before: {
			update: ["authenticate", "authorization"],
		},
	},
	actions: {
		update: {
			authorize: {
				role: "user" || "admin",
			},
			rest: "PATCH /",
			handler: async (ctx) => {
				const id = ctx.meta.userId;
				// console.log("this", id);

				try {
					if ("password" in ctx.params) {
						const pw = ctx.params.password;
						const salt = await bcrypt.genSalt(10);
						const newPw = await bcrypt.hash(pw, salt);
						const toUpdate = {
							password: newPw,
							pwUat: Math.floor(Date.now() / 1000),
						};
						try {
							await Admin.findByIdAndUpdate(id, toUpdate, {
								new: true,
								runValidators: true,
							});
							return "User Password Updated";
						} catch (error) {
							throw new Error(error);
						}
					}

					await Admin.findByIdAndUpdate(id, ctx.params, {
						new: true,
						runValidators: true,
					});

					return "User Info Updated";
				} catch (error) {
					throw new Error(error);
				}
			},
		},
	},
};
