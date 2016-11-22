var Transaction = require(process.env.transaction || "./transaction");
var BankAccount = require("../bank-account");


describe("A new transaction", function() {
	beforeEach(function() {
		// Methodstub for Date.now()
		spyOn(Date, 'now').andReturn(new Date("2016-11-22T09:49:51.010Z"));

		// Banc account spy
		var BankAccountSpy = class {
			withdraw() {}
			deposit() {}
		};

		this.accountA = new BankAccountSpy();
		this.accountB = new BankAccountSpy();
		this.transaction = new Transaction(this.accountA, this.accountB, 25);
	});

	it("has transaction date 2016-11-22T09:49:51.010Z", function() {
		expect(this.transaction.date).toEqual(new Date("2016-11-22T09:49:51.010Z"));
	});

	it("has an amount of 25", function() {
		expect(this.transaction.amount).toBe(25);
	});

	it("is not yet completed", function() {
		expect(this.transaction.completed).toBe(false);
	});
});