import { ResponseDefaultGet } from "./index";

export interface UserData extends Object {
	id: Number;
	full_name: string;
	nik: string;
	date_of_birth: string;
	gender: string;
	phone_number: string;
	nip: string;
	position: string;
	email: string;
	username: string;
	created_at: string;
	updated_at: string;
}

export interface UsersRes extends ResponseDefaultGet {
	data: UserData;
	token: string;
}
