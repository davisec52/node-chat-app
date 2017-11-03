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

/*socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});*/


$("#message-form").on("submit", function(e) {
	e.preventDefault();

	socket.emit("userMessage", {
		from: "User",
		text: $("[name=message]").val()
	}, function() {

	});

	//document.getElementById("form-text").value = "";
	$("[name=message]").val("");
	
});

let locButton = $("#send-location");

locButton.on("click", function(e) {
	if(!navigator.geolocation) {
		alert("Geolocation not supported by your browser.");
	}else {
		navigator.geolocation.getCurrentPosition(function(position) {
			socket.emit("createLocationMessage", {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, function() {
			alert("Unable to get location.");
		})
	}
});