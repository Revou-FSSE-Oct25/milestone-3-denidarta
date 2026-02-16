import axios from 'axios';
import {LoginRequest, LoginResponse} from '@/types/auth.types';
import {AUTH_TOKEN_URL} from '@/constants/constants';


export async function sendLoginRequest (
	credentials: LoginRequest,
): Promise<LoginResponse> {
	try {
		const response = await axios.post (AUTH_TOKEN_URL, credentials);
		
		return response.data;
	} catch (error) {
		if (axios.isAxiosError (error)) {
			console.error ('API ERROR:', error.response?.data || error.message);
		} else {
			console.error ('Unexpected Error:', error);
		}
		throw error;
	}
}
