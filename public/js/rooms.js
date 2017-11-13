let socket = io();

socket.on("updateRoomList", function(roomList) {

	console.log("room list ", roomList);
	/*let ol = $("<ol id='chat-room-list' class='chat__messages'></ol>");
	roomList.forEach(function(chatRoom) {
		ol.append($("<li></li>").text(chatRoom));
	});
	$("#room-list").append(ol);*/
});