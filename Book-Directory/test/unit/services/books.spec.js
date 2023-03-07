"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const BooksService = require("../../../services/books.service");


describe("Test 'books' service", () => {
    let broker = new ServiceBroker({logger : false});
    broker.createService(BooksService);

    beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    describe("Test 'books.create' action", () => {
        it("should return with 'Book created successfully'", async () => {
            const result = await broker.call("books.create", {
                name : "test name1",
                author: "test author",
                description : "test description",
                price : 1800
            })
            expect(result).toBe("Book created successfully");
        })
    })
})