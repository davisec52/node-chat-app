let expect = require("expect");
let request = require("supertest");

let {generateMessage} = require("./message");

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