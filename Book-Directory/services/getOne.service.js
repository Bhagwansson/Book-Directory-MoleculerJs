const Book = require("../model/bookModel.js");

module.exports = {
    name : "findBook",
    events: {
        async "book.find" (ctx) {
            console.log("This is ctx" , ctx.params)
            const _id = ctx.params
            const book = await Book.findOne({_id});
            console.log(book)
            return book;
        }
    }
}