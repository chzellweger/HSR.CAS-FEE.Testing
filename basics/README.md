# What happens without testing?


## A short Story first

1. BankAccount implementation -> [bank-account.js](./1-initial/bank-account.js)
2. BankAccount usage -> [main.js](./1-initial/main.js) or:
	```javascript
	// .../CAS-FEE/HSR.CAS-FEE.Testing/basics $
	var BankAccount = require("./1-initial/bank-account");
	// undefined

	var account = new BankAccount();
	// create account
	// undefined

	account.balance
	// 0

	account.deposit(50);
	// Deposit 50. Balance 50.
	// true

	account.withdraw(50);
	// Withdraw of 50 failed.
	// false

	account.withdraw(20);
	// Withdraw 30. Balance 30.
	// true
	```

3. Refactoring of the  return statement (make it more readable) -> [bank-account.js](./2-refactoring/bank-account.js):
	```javascript
	hasTooLessCredit(amount) {
		return
			this.balance < Math.abs(amount) ||
			amount > this.balance * this.maximalWithdrawFactor;
	}
	```

4. Reactoring broke the functionality -> [main.js](./2-refactoring/main.js) or:
	```javascript
	// .../CAS-FEE/HSR.CAS-FEE.Testing/basics $
	var BankAccount = require("./2-refactoring/bank-account");
	// undefined

	var account = new BankAccount();
	// create account
	// undefined

	account.balance
	// 0

	account.deposit(50);
	// Deposit 50. Balance 50.
	// true

	account.withdraw(20);
	// Withdraw 50. Balance -20.
	// true
	```

	The compiler will insert a semicolon after `return <-'` (See `empty statement` and `semicolon insertion` in JavaScript).


## How to do it better?

Write **tests/specs** first, then implement the functionality.


### Stories of a bank account

* **As a** `bank agent` **I want to** `create accounts` **so that** customers `can deposit and withdraw amounts`.
* **As a** `bank customer` **I want to** `deposit amounts` **so that** I can `store my money`.
* **As a** `bank customer` **I want to** `withdraw amounts` **so that** I `get back my stored money`.
* **As a** `bank` **I want to** `prevent customers from overdrawing` their account **so that** I can `lower my risk`.


### Specification

#### Szenario `new account`
**Given** a `New account`
* **Then** the balance should be 0
* **When** the Account balance is 0
	* **Then** withdraw should be impossible
	* **And** deposit of 50 is made
		* **Then** the balance should be 50

#### Szenario `account balance 50`
**Given** an account with balance 50
* **When** withdrawed
	* **Then** the maximal withdraw should be 50 * 25%
* **When** withdrawed 50 * 25%
	* **Then** the balance should be 37.5


### Exercise

1. Start beginning on this project `npm install` or create a new project and install Jasmine `npm install --save-dev jasmine-node`.
2. Take a look at http://evanhahn.com/how-do-i-jasmine/ and https://jasmine.github.io/edge/introduction.html to get familiar with Jasmine.
3. Create `bank-account.spec.js` and implement the specification.
4. Run Jasmine (Ignore the thing about the SpecRunner in the tutorial. The SpecRunner is used to run Jasmine on the client but we run it on nodejs):
	```shell
	// .../CAS-FEE/HSR.CAS-FEE.Testing/basics $
	$(npm bin)/jasmine-node --verbose 3-spec/*.spec.js
	```

	`$(npm bin)/` allows you to install & use jasmine locally.
	The usage of global modules (`npm install -g xyz`) is not recommended.
	Different projects may need different versions of a library/tool.
5. The tests should not pass (because we didn't fix the broken return yet)!
6. Fix the broken return statement
7. Tests should pass!
8. How is this development cycle called? -> [solution](./4-solution/bank-account.spec.js)