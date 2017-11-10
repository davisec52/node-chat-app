const expect = require("expect");

let {Users} = require("./users");

describe("Users", () => {
	let users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: "1",
			name: "Caleb",
			room: "Crypto"
		}, {
			id: "2",
			name: "Jocie",
			room: "Python"
		}, {
			id: "3",
			name: "Safi",
			room: "Crypto"
		}];
		
	});

	it("should create new user", () => {
		let users = new Users();
		let newUser = {
			id: "123",
			name: "Caleb",
			room: "Crypto"
		};

		users.addUser(newUser.id, newUser.name, newUser.room);

		expect(users.users).toEqual([newUser]);
	});

	it("should remove an existing user test 1", () => {
		let user = users.removeUser("1");
		expect(user.id).toBe("1");
		expect(users.users.length).toBe(2);
	});

	it("should not remove an existing user when no id is found", () => {
		let user = users.removeUser("12");
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it("should find a user", () => {
		let foundUser = users.getUser("2");
		expect(foundUser).toEqual({
			id: "2",
			name: "Jocie",
			room: "Python"
		});

	});

	it("should not find a user", () => {
		let foundUser = users.getUser("12");
		expect(foundUser).toNotExist();
	});

	it("should provide list of users for Crypto room", () => {
		let result = users.getUserList("Crypto");
		expect(result).toEqual(["Caleb", "Safi"]);
	});

	it("should provide list of users for Python room", () => {
		let result = users.getUserList("Python");
		expect(result).toEqual(["Jocie"]);
	});

});