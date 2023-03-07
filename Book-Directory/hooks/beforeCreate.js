const Book = require("../model/bookModel.js");

const beforeCreate = async (ctx) => {
	const { name } = ctx.params;
	const exists = await Book.findOne({ name });
	// console.log("this is:", exists)

	if (exists) {
		throw new Error(`Book already exists`);
		// ctx.meta.exists = true
	}
	

	// console.log("Before hook")
};

const beforeDelete = async (ctx) => {
	const { name } = ctx.params;
	const exists = await Book.findOne({ name });

	if (!exists) {
		throw new Error(`The book you're trying to delete does not exist`);
		// ctx.meta.exists = true
	}
	

	// console.log("Before hook")
};

const beforeSearch = async (ctx) => {
	const _id  = ctx.params.id;
	// console.log("This is the body before create" ,ctx.params.params)
	const exists = await Book.findOne({ _id });
	// console.log("this is:", exists)

	if (!exists) {
		throw new Error(`The book youre trying to search doesnot exist`);
		// ctx.meta.exists = true
	}
	

	// console.log("Before hook")
};

const beforeUpdate = async (ctx) => {
	const { name } = ctx.params;
	const exists = await Book.findOne({ name });
	// console.log("this is:", exists)

	if (!exists) {
		throw new Error(`The book you're trying to update doesnot exist`);
		// ctx.meta.exists = true
	}
	

	// console.log("Before hook")
};

module.exports = {beforeCreate, beforeDelete, beforeSearch, beforeUpdate};
