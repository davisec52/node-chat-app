let expect = require("expect");
let request = require("supertest");

let {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
	it("should generate correct message object", () => {
		let result = generateMessage("Admin", "Unleash the Kraken!");

		expect(result).toInclude({
			from: "Admin",
			text: "Unleash the Kraken!"
		});
		expect(typeof result.createdAt).toBe("number");
	});
});

describe("generateLocationMessage", () => {
	it("should return a location object", () => {
		let result = generateLocationMessage("X", 41.6436717, -91.563493);
		expect(result).toInclude({
			from: "X",
			url: "https://www.google.com/maps?q=41.6436717,-91.563493"
		});
		expect(typeof result.createdAt).toBe("number");
	});
});