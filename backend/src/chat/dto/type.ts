type Direct_message = {
	recieverId: string,
	content: message
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
