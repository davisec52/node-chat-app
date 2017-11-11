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
  
  let params = $.deparam(window.location.search);

  socket.emit("join", params, (err) => {
  	if(err) {
  		alert("Error");
  		window.location.href = "/";
  	}else {
  		console.log("No error");
  	}
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on("updateUserList", function(users) {
	let ol = $("<ol></ol>");
	users.forEach(function(user) {
		ol.append($("<li></li>").text(user));
	});
	$("#users").html(ol);
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
});

$("#message-form").on("submit", function(e) {
	e.preventDefault();

	let messageTextBox = $("[name=message]");

	socket.emit("userMessage", {
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