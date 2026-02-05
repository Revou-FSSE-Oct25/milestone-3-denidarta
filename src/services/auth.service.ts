
import axios, {AxiosInstance} from "axios";
import { LoginRequest, LoginResponse } from "@/types/auth.types";
import { User } from "@/types/types";

const API_URL = 'https://api.escuelajs.co/api/v1';
const apiClient : AxiosInstance = axios.create({
	baseURL: API_URL
});

export async function loginUser (credentials : LoginRequest): Promise <LoginResponse> {
	const response = await apiClient.post('/auth/login', credentials);
	return response.data;
}

export async function fetchAllUsers(): Promise<User[]> {
	const response = await apiClient.get('/users');
	return response.data;
}