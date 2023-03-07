const mongoose = require("mongoose");
const Book = require("../model/bookModel.js");
const authMixin = require("../../admin-services/mixins/auth.mixin");
// const authMixin = require("../mixins/auth.mixin");
// const sampleMixin = require("../mixins/saample.mixin")

const {
	beforeCreate,
	beforeDelete,
	beforeSearch,
	beforeUpdate,
} = require("../hooks/beforeCreate");

module.exports = {
	name: "books",
	mixins: [authMixin],
	hooks: {
		before: {
			create: [beforeCreate],
			delete: ["authenticate", "authorization",beforeDelete],
			getOne: beforeSearch,
			update: beforeUpdate,
			getAll: ["authenticate", "authorization"],
		},
	},
	actions: {
		create: {
			authorize: {
				role: "admin",
			},
			rest: "POST /",
			// handler: (ctx) => {
			// 	// console.log(ctx)
			// 	const { name, author, price, description } = ctx.params;

			// 	const result = ctx.call("createBook.creating", {
			// 		name,
			// 		author,
			// 		price,
			// 		description,
			// 	});
			// 	console.log(result);
			// 	return result;
			// },
			handler: async (ctx) => {
				const { name, author, price, description } = ctx.params;
				try {
					await Book.create({ name, author, price, description });
					return "Book created successfully";
				} catch (error) {
					throw new Error("There was an error creating");
				}
			},
		},
		getAll: {
			authorize: {
				role: "user",
			},
			params: {
				author: {
					type: "string",
					optional: true,
				},
				name: {
					type: "string",
					optional: true,
				},
				availability: {
					type: "string",
					optional: true,
				},
			},
			rest: "GET /",
			handler: async (ctx) => {
	


				let filterQuery = {};

				if ("author" in ctx.params) {
					filterQuery = {
						author: { $regex: ctx.params.author, $options: "i" },
					};
				}
				if ("name" in ctx.params) {
					filterQuery = {
						name: { $regex: ctx.params.name, $options: "i" },
					};
					console.log("this is filterquery", filterQuery);
				}
				if ("availability" in ctx.params) {
					filterQuery = {
						availability:
							ctx.params.availability === "true" ? true : false,
					};
				}
				// console.log("This is from get",ctx.meta.role)
				return await Book.find(filterQuery);
			},
		},
		getOne: {
			rest: {
				path: "/:id",
				method: "GET",
			},
			handler: async (ctx) => {
				// console.log("This is the body" ,ctx.params)
				// console.log( "This is id",ctx.params.id)
				const _id = ctx.params.id;
				const book = await ctx.emit("book.find", _id);
				return book;
			},
		},
		update: {
			rest: "PATCH /update",
			handler: async (ctx) => {
				const { name, author, price, description } = ctx.params;
				const book = await ctx.emit("book.update", {
					name,
					author,
					price,
					description,
				});
				console.log(book);
				return "Book updated successfully";
			},
		},
		delete: {
			authorize: {
				role: "admin",
			},
			rest: "DELETE /delete",
			handler: async (ctx) => {
				const { name } = ctx.params;
				await ctx.emit("book.delete", { name });
				return "Book deleted successfully";
			},
		},

		doesSomething: {
			rest: "GET /doesSomething/:id",
			handler: async (ctx) => {
				console.log(ctx.params);
				console.log("This handler does something");
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
