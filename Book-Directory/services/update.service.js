const Book = require("../model/bookModel.js");

module.exports = {
	name: "updateBook",
	events: {
		async "book.update"(ctx) {
			const { name, author, price, description } = ctx.params;
			const book = await Book.findOneAndUpdate(
				{ name },
				{ author, price, description },
				{ new: true }
			);
            return book;
		},
	},
};
