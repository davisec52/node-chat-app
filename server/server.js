const express = require("express");
const app = express();
const socketIO = require("socket.io");
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const http = require("http");
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
	console.log("New user connected");
	
	socket.on("disconnect", (socket) => {
		console.log("Server disconnected from client");
	});
});





let port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log("Server listening on port 3000");
})