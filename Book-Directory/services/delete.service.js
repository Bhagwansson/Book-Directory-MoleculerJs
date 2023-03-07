const Book = require("../model/bookModel.js");

module.exports = {
    name: "deleteBook",
    events : {
        async "book.delete" (ctx) {
            const {name} = ctx.params;
            await Book.findOneAndDelete({ name });
        }
    }
}