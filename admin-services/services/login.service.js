const Admin = require("../models/adminModel");

module.exports = {
	name: "login",
	actions: {
		signin: {
            rest : "POST /",
			handler : async (ctx) => {
                // console.log(ctx.params)
				const { email, password } = ctx.params;
				if (!email || !password) {
					throw new Error("Please enter both email and password");
				}
				const admin = await Admin.findOne({ email }); 
				if (!admin) {
					throw new Error("Invalid email address");
				}
				const isPasswordCorrect = await admin.comparePassword(password);
				if (!isPasswordCorrect) {
					throw new Error("Invalid password");
				}

                const accessToken = await admin.createAccessJWT();

                return (accessToken)
			},
		},
	},
};
