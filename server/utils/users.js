
// socket.id will be stored in id.
[{
	id: "",
	name: "",
	room: ""
}]


class Users {
	constructor () {
		this.users = [];
		this.rooms = [];
	}

	checkNames(room) {
		let roomUsers = this.users.filter((user) => user.room === room);
		let userList = roomUsers.map((user) => user.name.toLowerCase());

		return userList;
	}

	addRoom(room) {
		let chatRoom = room;
		this.rooms.push(chatRoom);
		return chatRoom;
	}

	removeRoom(room) {
		let removedRoom = this.rooms.filter((chatRoom) => chatRoom === room);

		if(removedRoom) {
			this.rooms = this.rooms.filter((chatRoom) => chatRoom !== room);
		}
		
		return removedRoom;
	}

	getRoomList() {
		return this.rooms;
	}

	addUser(id, name, room) {
		let user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser(id) {
		//Return user who was removed

		let removedUser = this.users.filter((user) => user.id === id)[0];

		if(removedUser) {
			this.users = this.users.filter((user) => user.id !==id);
		}
		
		return removedUser;
	}

	removeUserByName(name) {
		let removedUser = this.users.filter((user) => user.name = name)[0];
		if(removedUser) {
			this.users = this.users.filter((user) => user.nsme !== name);
		}
		return removedUser;
	}

	getUser(id) {
		let res = this.users.filter((user) => user.id === id)[0];
		return res;

	}

	getUserList(room) {
		let roomUsers = this.users.filter((user) => user.room === room);
		let userList = roomUsers.map((user) => user.name);

		return userList;

	}
}

module.exports = {Users};





//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

/*class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	getUserDescription() {
		return `${this.name} is ${this.age} years old`;
	}
}

let me = new Person("evan", 150);

let description = me.getUserDescription();

console.log(description);*/