import {User} from "@/types/user.types";
import {USER_API_URL} from "@/constants";

export async function fetchAllUsers(): Promise<User[]> {
	const res = await fetch(USER_API_URL);
	if (!res.ok) throw new Error(res.statusText);
	return res.json();
}