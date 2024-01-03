type Direct_message = {
	recieverId: string,
	message: string,
	//content: message
}


type message = {
	sended_at : Date,
	message_content: string,
}


type message_history = {
	mine: boolean,
	sended_at : Date,
	content: string,
	name : string
	picture: string,
}


type get_history = {
	friend_id: string,
}



type channel_msg = {
	channel_id : string,
	content: string
}

type join_channel = {
	channel_id : string
}


type room_msg = {
	senderid: string,
	content: string,
	time : Date,
	photo: string
}

type leave_channel = {
	channel  : string,
}

type room_msg_history = {
	sender_id: string,
	content: string,
	mine: Boolean,
	time: Date,
	photo: string,
	name: string
}