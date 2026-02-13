export interface User {
	creationAt: string;
	id: number;
	email: string;
	password: string;
	name: string;
	role: string;
	avatar?: string;
}