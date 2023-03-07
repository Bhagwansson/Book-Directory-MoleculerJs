const mongoose = require("mongoose");
const Admin = require("../models/adminModel.js");

module.exports = {
	name: "register",
	actions: {
		signup: {
			rest: "POST /",
			handler: async (ctx) => {
				const { firstName, lastName, email, password, role } =
					ctx.params;
				if (!firstName || !lastName || !email || !password || !role) {
					return "Enter all the necessary information";
				} else {
					const exists = await Admin.findOne({ email });
					if (exists) {
						throw new Error("Email already exists");
					}
					await Admin.create({
						firstName,
						lastName,
						email,
						password,
						role,
						pwUat: Math.floor(Date.now() / 1000),
					});
					ctx.emit("register.success", {
						firstName,
						lastName,
						email,
					});
					return "Registration Successful. Check Your Email Address";
				}
			},
		},
	},
	async started() {
		await mongoose
			.connect(
				"mongodb+srv://SonOfGod:tn3xGKDB95mkZJcD@moleculerjs.xlnln9z.mongodb.net/Book_Directory_Moleculer?retryWrites=true&w=majority"
			)
			.then(() => console.log("Successfully connected to DB"))
			.catch((err) => console.log(err));
	},
};
