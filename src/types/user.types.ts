export interface User {
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
	avatar?: string;
	creationAt: string;
}

export interface CreateUser {
	name: string;
	email: string;
	password: string;
	avatar: string;
}