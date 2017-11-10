const expect = require("expect");
const express = require("express");
const app = express();
const socketIO = require("socket.io");

const http = require("http");
let server = http.createServer(app);
let io = socketIO(server);
let {isRealString} = require("./validation");

describe("isRealString", () => {
	it("should reject nonstring values", () => {
		let params = {
			name: 12345,
			room: ""
		}

		io.on("connection", (socket) => {
			socket.emit("join", params, (err) => {
				if(err) {
					expect(isRealString(params[0])).toBe(false);
					expect(isRealString(params[1])).toBe(false);
				}
			});
		});
		
	});

	it("should reject a string with only spaces", () => {
		let params = {
			name: "   ",
			room: "  "
		}

		io.on("connection", (socket) => {
			socket.emit("join", params, (err) => {
				if(err) {
					expect(isRealString(params[0])).toBe(false);
					expect(isRealString(params[1])).toBe(false);
				}
			});
		});
	});

	it("should allow strings with non-space characters", () => {
		let params = {
			name: "Me   ",
			room: "Cry  pto"
		}

		io.on("connection", (socket) => {
			socket.emit("join", (err) => {
				if(err) {
					expect(isRealString(params[0])).toBe(false);
					expect(isRealString(params[1])).toBe(false);
				}else {
					expect(isRealString(params[0])).toBe(true);
					expect(isRealString(params[1])).toBe(true);
				}
			});
		});
	});

});