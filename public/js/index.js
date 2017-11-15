let socket = io();

socket.on("updateRoomList", function(roomList) {

	let ol = $("<ol id='chat-room-list' class='chat__messages'></ol>");
	
	roomList.forEach(function(chatRoom) {
		let li = $("<li class='room-item'></li>");

		//let a = $("<a  href='#'></a>")
		li.append($(`<a class='room-btn' ></a>`).text(chatRoom));
		//ol.append($("<li class='room-item'></li>").text(chatRoom));
		ol.append(li);
	});
	$("#room-list").append(ol);

	$("#chat-room-list").on("click", "li", function(e) {
		$("[name=room]").val($(this).text());
		$("#join-btn").click();
	})
});

