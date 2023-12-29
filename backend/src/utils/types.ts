import { RoomType } from "@prisma/client";

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

export type create_channel = {
	name : string,
	photo: string,
	password: string,
	permission : RoomType
}

export type channels = {
	name : string,
	type : string,
	joined: boolean,
	id : string
}