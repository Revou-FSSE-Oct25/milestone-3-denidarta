import {beforeEach, describe, expect, it, type Mock, vi} from "vitest";
import {cookies} from "next/headers";
import {getAuthCookies, setAuthCookies} from "@/utils/cookies";

vi.mock("next/headers", () => ({
	cookies: vi.fn(),
}));

describe("Auth Cookies", () => {
	const mockAccessToken = "this is a mock access token";
	const mockRefreshToken = "this is a mock refresh token";
	const mockCookies = cookies as Mock;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should store access token and refresh token in cookies", async () => {
		const setMock = vi.fn();
		mockCookies.mockResolvedValue({
			set: setMock,
			get: vi.fn(),
		});

		await setAuthCookies(mockAccessToken, mockRefreshToken);

		expect(setMock).toHaveBeenCalledTimes(2);
		expect(setMock).toHaveBeenCalledWith(
			"accessToken",
			mockAccessToken,
			expect.objectContaining({
				httpOnly: true,
				path: "/",
				sameSite: "lax",
			})
		);
		expect(setMock).toHaveBeenCalledWith(
			"refreshToken",
			mockRefreshToken,
			expect.objectContaining({
				httpOnly: true,
				path: "/",
				sameSite: "lax",
			})
		);
	});

	it("should retrieve access token and refresh token from cookies", async () => {
		mockCookies.mockResolvedValue({
			get: vi.fn((name) => {
				if (name === "accessToken") return {value: mockAccessToken};
				if (name === "refreshToken") return {value: mockRefreshToken};
				return undefined;
			}),
		});

		const {accessToken, refreshToken} = await getAuthCookies();

		expect(accessToken).toBe(mockAccessToken);
		expect(refreshToken).toBe(mockRefreshToken);
	});

	it("should return null if cookies are not present", async () => {
		mockCookies.mockResolvedValue({
			get: vi.fn(() => undefined),
		});

		const {accessToken, refreshToken} = await getAuthCookies();

		expect(accessToken).toBeNull();
		expect(refreshToken).toBeNull();
	});
});