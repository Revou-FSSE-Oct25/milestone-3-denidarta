import { cookies } from "next/headers";

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set("accessToken", accessToken, {
    path: "/",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", refreshToken, {
    path: "/",
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
  });
}

export async function getAuthCookies(): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
}> {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get("accessToken")?.value || null,
    refreshToken: cookieStore.get("refreshToken")?.value || null,
  };
}
