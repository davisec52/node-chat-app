const express = require("express");
const app = express();
const socketIO = require("socket.io");
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const http = require("http");
let server = http.createServer(app);
let io = socketIO(server);
let {generateMessage, generateLocationMessage} = require("./utils/message");
let port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on("connection", (socket) => {
	console.log("New user connected");

	socket.emit("newMessage", generateMessage("Admin", "Welcome to the Monkey House!"));

	socket.broadcast.emit("newMessage", generateMessage("Admin", "New user has joined"));

	socket.on("userMessage", (userMsg, callback) => {
		console.log("new user message ", userMsg);

		io.emit("newMessage", generateMessage(userMsg.from, userMsg.text));
		callback();
	});

	socket.on("createLocationMessage", (coords) => {
		console.log(generateLocationMessage("Q", coords.latitude, coords.longitude));
		io.emit("newLocationMessage", generateLocationMessage("Q", coords.latitude, coords.longitude));
	});


	socket.on("disconnect", (socket) => {
		console.log("Server disconnected from client");
	});
});

server.listen(port, () => {
	console.log("Server listening on port 3000");
});