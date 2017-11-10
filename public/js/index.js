let socket = io();

function scrollToBottom() {
	let messages = $("#messages");
	let newMessage = $("li:last-child");
	let clientHeight = messages.prop("clientHeight");
	let scrollTop = messages.prop("scrollTop");
	let scrollHeight = messages.prop("scrollHeight");
	let newMessageHeight = newMessage.innerHeight();
	let lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

/*socket.on("newMessage", function (message) {
	let formattedTime = moment(message.createdAt).format("h:mm a");
	let template = $("#message-template").html();
  	let html = Mustache.render(template, {
  		from: message.from,
  		text: message.text,
  		createdAt: formattedTime

  	});
  	$("#messages").append(html);
  	scrollToBottom();
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
  	scrollToBottom();
});*/

$("#join-form").on("submit", function(e) {
	e.preventDefault();

	console.log(location);

	/*let messageTextBox = $("[name=message]");

	socket.emit("userMessage", {
		from: "User",
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val("");
	});*/
});

let locButton = $("#join-form");

locButton.on("click", function(e) {

	console.log("button clicked");
	/*if(!navigator.geolocation) {
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
	//}*/
});