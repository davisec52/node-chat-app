let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  let li = $(`<li></li>`);
  //li.text(`${message.from}: ${message.from}`);
  li.text(`${message.from}: ${message.text}`);

  $("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
	let li = $(`<li></li>`);
	let a = $(`<a target="_blank">My location</a>`);
	li.text(`${message.from}: `);
	a.attr("href", message.url);
	li.append(a);
	$("#messages").append(li);
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
			//locButtion.removeAttr("disabled");
			alert("Unable to get location.");
		});
	//}
});