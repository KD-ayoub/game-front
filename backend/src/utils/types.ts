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
	login: string,
	image: string,
}

