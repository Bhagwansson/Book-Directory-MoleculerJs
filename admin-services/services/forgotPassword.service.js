const Admin = require("../models/adminModel");
const {MoleculerError} = require("moleculer").Errors
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	name: "forgotPassword",
	actions: {
		change: {
			rest: "PATCH /",
			handler: async (ctx) => {
				const email = ctx.params;
				console.log(email);
				const exists = await Admin.findOne(email);
				if (!exists) {
					throw new MoleculerError("User does not exist", 404);
				}

				const token = jwt.sign(
					{ userId: exists._id},
					process.env.changePassword_SECRET,
					{ expiresIn: process.env.changePassword_LIFETIME }
				);
				const pwChangeLink = `localhost:5000/api/reset?token=${token}`;
				console.log("this is user", exists);
				console.log("this is link", pwChangeLink);

				const transport = nodemailer.createTransport({
					host: "smtp.mailtrap.io",
					port: 2525,
					auth: {
						user: "ad5a08115032d4",
						pass: "40ffcd880c7ea3",
					},
				});
				await transport.sendMail({
					from: '"BookKart📚" <bookkart@gmail.com>',
					to: exists.email,
					subject: "Reset Password",
					text: `Hello ${exists.firstName} ${exists.lastName}. Use the following link to reset your password : "${pwChangeLink}". The link is only valid for 3 hours.`,
				});
                return "A password reset link has been sent to your email"
			},
		},
	},
};
