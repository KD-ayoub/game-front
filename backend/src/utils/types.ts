import { RoomType } from "@prisma/client";


// auth
export type server_response = {
	full_name: string,
	nickname: string,
	id: string,
	intra_42_id: number,
	first_time: boolean,
}

export type  user_request = server_response;


export type signup = {
	full_name: string,
	nickname : string,
	//image: string,
}

export type _2fa = {
	code : string,
}

// channels
export type create_channel = {
	name : string,
	photo: string,
	password: string,
	type : RoomType
}

export type channels = {
	nameOfChannel: string;
    photo: string;
    id: string;
	type: string;
    isJoined: boolean;
}

export type join_protected_channel = {
	id : string,
	password: string
}

export type add_admin = {
	member_id: string,
	channel_id: string
}
