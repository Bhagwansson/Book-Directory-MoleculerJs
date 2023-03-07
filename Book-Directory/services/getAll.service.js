const Book = require("../model/bookModel.js");

module.exports = {
	name: "findBooks",
	events: {
		async "book.findAll"(ctx) {
			const {author} = ctx.params
			const books = await Book.find();
			console.log(books.author);
		},
	},
};






