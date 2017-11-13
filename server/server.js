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
	let signal = true;

	socket.emit("updateRoomList", users.getRoomList());

	socket.on("join", (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback("Check name or room or both");
		}

		//io.emit --> io.to("some room").emmit
		//socket.broadcast.emit --> socket.broadcast.to("some room").emit
		//socket.emit("some_emit", some_callback);

		console.log("socket id ", socket.id);

		let names = users.checkNames(params.room);
		console.log("name check ", names);
		names.forEach((name) => {
			if(name === params.name.toLowerCase()) {
				console.log("Name must be unique");
				users.removeUser(socket.id);
				signal = false;
				return socket.emit("nameError");
			}
		});

		//By changing params.room to lower case, we reduce instances of duplication.

		

		params.room = params.room.toLowerCase();
		users.removeRoom(params.room);
		users.addRoom(params.room);
		console.log("room list from server.js ", users.getRoomList());
		
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit("updateUserList", users.getUserList(params.room));
		socket.emit("newMessage", generateMessage("Admin", `Welcome to Chat Now! You have joined the room: ${params.room}`));
		if(signal) {
			socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined!`));
		}

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

		if(user && signal) {
			io.to(user.room).emit("updateUserList", users.getUserList(user.room));
			io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the room.`));
		}
		//io.to(user.room).emit("updateUserList", users.getUserList(user.room));
	});
});

server.listen(port, () => {
	console.log("Server listening on port 3000");
});