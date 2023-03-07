const nodemailer = require("nodemailer");

module.exports = {
	name: "email",

	events: {
		async "register.success"(ctx) {
			const { firstName, lastName, email } = ctx.params;

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
				to: email,
				subject: "Welcome To BookKart",
				text: `Hello ${firstName} ${lastName}. You have been registered...`,
			});
		},
	},
};
