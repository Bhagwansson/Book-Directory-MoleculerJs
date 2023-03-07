const Book = require("../model/bookModel.js");

module.exports = {
	name: "createBook",
	actions: {
		creating: {
			handler: async (ctx) => {
				const { name, author, price, description, availability } = ctx.params;
				try {
					await Book.create({ name, author, price, description, availability });
					return "Book created successfully";
				} catch (error) {
					throw new Error("There was an error creating") ;
				}
			}
		},
	},
};
