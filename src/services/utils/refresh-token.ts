import Cookies from "js-cookie";
import tokenManager from "@/services/utils/tokenManager";

const refreshToken = async (): Promise<string | null> => {
  const refresh_token = Cookies.get("refresh_token");
  if (!refresh_token) return null;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.DATA_API_KEY ?? "",
        },
        body: JSON.stringify({ refresh_token }),
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data?.token) {
      tokenManager.setAccessToken(data.token);
      if (data.refresh_token) {
        tokenManager.setRefreshToken(data.refresh_token);
      }
      return data.token;
    }
    return null;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

export default refreshToken;
