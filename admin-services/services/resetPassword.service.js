const Admin = require("../models/adminModel");
const { MoleculerError } = require("moleculer").Errors;
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	name: "reset",
	actions: {
		password: {
			rest: "PATCH /",
			params: {
				token: "string",
			},
			handler: async (ctx) => {
				let linkToken = "";
				if ("token" in ctx.params) {
					linkToken = ctx.params.token;
				}
				let payload;
				try {
					payload = jwt.verify(
						linkToken,
						process.env.changePassword_SECRET,
						process.env.changePassword_LIFETIME
					);
				} catch (error) {
					if (error.name === "TokenExpiredError") {
						throw new MoleculerError("The link has expired", 401);
					} else {
						throw new MoleculerError(
							"Not authorized to access this route",
							401
						);
					}
				}

				const pw = ctx.params.password;
				const salt = await bcrypt.genSalt(10);
				const newPw = await bcrypt.hash(pw, salt);
				const toUpdate = {
					password: newPw,
					pwUat: Math.floor(Date.now() / 1000),
				};
				let user;
				try {
					user = await Admin.findByIdAndUpdate(
						payload.userId,
						toUpdate,
						{
							new: true,
							runValidators: true,
						}
					);
				} catch (error) {
					throw new MoleculerError("Some error Occurred", 500);
				}
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
					to: user.email,
					subject: "Password Reset Successful",
					text: `Hello ${user.firstName} ${user.lastName}. Your password reset attempt was successful.`,
				});
				return "User Password Reset Successful";
			},
		},
	},
};
