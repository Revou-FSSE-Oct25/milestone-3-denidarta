import axios, { AxiosInstance } from "axios";
import { LoginRequest, LoginResponse } from "@/types/auth.types";

const API_URL = "https://api.escuelajs.co/api/v1";
const apiClient: AxiosInstance = axios.create({
	baseURL: API_URL,
});

export async function sendLoginRequest(
	credentials: LoginRequest,
): Promise<LoginResponse> {
	try {
		const response = await apiClient.post("/auth/login", credentials);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("API ERROR:", error.response?.data || error.message);
		} else {
			console.error("Unexpected Error:", error);
		}
		throw error;
	}
}
