const express = require("express");
const app = express();
const socketIO = require("socket.io");
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const http = require("http");
const {Users} = require("./utils/users");
let server = http.createServer(app);
let io = socketIO(server);
let {generateMessage, generateLocationMessage} = require("./utils/message");
let {isRealString} = require("./utils/validation");
let users = new Users();
let port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on("connection", (socket) => {
	console.log("New user connected");

	socket.on("join", (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback("Check name or room or both");
		}
		console.log("socket id ", socket.id);
		//io.emit --> io.to("some room").emmit
		//socket.broadcast.emit --> socket.broadcast.to("some room").emit
		//socket.emit("some_emit", some_callback);

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit("updateUserList", users.getUserList(params.room));
		socket.emit("newMessage", generateMessage("Admin", "Welcome to the Monkey House!"));
		socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined!`));

		callback();
	});

	socket.on("userMessage", (userMsg, callback) => {

		let user = users.getUser(socket.id);

		if(user && isRealString(userMsg.text)) {
			io.to(user.room).emit("newMessage", generateMessage(user.name, userMsg.text));
		}
		
		callback();
	});

	socket.on("createLocationMessage", (coords) => {
		let user = users.getUser(socket.id);

		if(user) {
			io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});


	socket.on("disconnect", () => {
		console.log("Server disconnected from client");
		let user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit("updateUserList", users.getUserList(user.room));
			io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the room.`));
		}
		
	});
});

server.listen(port, () => {
	console.log("Server listening on port 3000");
});