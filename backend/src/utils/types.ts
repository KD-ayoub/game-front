export type server_response = {
	full_name: string,
	login: string,
	id: string,
	intra_42_id: number,
	first_time: boolean,
}


export type  intra_api_info = {
	full_name: string,
	login: string,
	intra_42_id: number,
	email: String,
	image: String,
}

export type  user_request = server_response;


export type signup = {
	full_name: string,
	login: string,
	image: string,
	_2fa: boolean,
	email: string
}

