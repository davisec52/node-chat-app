let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on("newMessage", function (message) {
	let formattedTime = moment(message.createdAt).format("h:mm a");
	let template = $("#message-template").html();
  	let html = Mustache.render(template, {
  		from: message.from,
  		text: message.text,
  		createdAt: formattedTime

  	});
  	$("#messages").append(html);
});

socket.on("newLocationMessage", function(message) {

	console.log("new location message ", message.from);
	let formattedTime = moment(message.createdAt).format("h:mm a");
	let template = $("#location-message-template").html();
  	let html = Mustache.render(template, {
  		from: message.from,
  		url: message.url,
  		createdAt: formattedTime

  	});
  	$("#messages").append(html);
});

$("#message-form").on("submit", function(e) {
	e.preventDefault();

	let messageTextBox = $("[name=message]");

	socket.emit("userMessage", {
		from: "User",
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val("");
	});
});

let locButton = $("#send-location");

locButton.on("click", function(e) {
	if(!navigator.geolocation) {
		alert("Geolocation not supported by your browser.");
	}//else {
		locButton.prop("disabled", true).text("Sending location...");
		navigator.geolocation.getCurrentPosition(function(position) {
			locButton.prop("disabled", false).text("Send Location");
			socket.emit("createLocationMessage", {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, function() {
			locButtion.prop("disabled", false);
			alert("Unable to get location.");
		});
	//}
});