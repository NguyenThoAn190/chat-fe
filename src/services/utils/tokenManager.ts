import { CookiesContains } from "@/constants/cookies";
import Cookies from "js-cookie";

// Giao diện cho dữ liệu token
export interface DecodedToken {
  accessToken: string;
  refreshToken: string;
  email: string;
  role: string;
}

const tokenManager = {
  // Phương thức lưu token vào cookie
  setTokens: (
    accessToken: string,
    refreshToken: string,
    user: { email: string; role: string }
  ) => {
    const tokenData: DecodedToken = {
      accessToken,
      refreshToken,
      email: user.email,
      role: user.role,
    };
    Cookies.set(
      CookiesContains.TOKEN,
      JSON.stringify(tokenData)
      // {
      //   secure: true,
      // }
    );
  },

  setAccessToken: (newAccessToken: string) => {
    const tokenData = tokenManager.getTokenData();
    if (!tokenData) {
      console.error("No token data found to set accessToken.");
      return;
    }

    tokenData.accessToken = newAccessToken;
    Cookies.set(CookiesContains.TOKEN, JSON.stringify(tokenData));
  },
  setRefreshToken: (newRefreshToken: string) => {
    const tokenData = tokenManager.getTokenData();
    if (!tokenData) {
      console.error("No token data found to set accessToken.");
      return;
    }

    tokenData.refreshToken = newRefreshToken;
    Cookies.set(CookiesContains.TOKEN, JSON.stringify(tokenData));
  },

  isTokenExpired: (token: string): boolean => {
    if (!token) return true;
    try {
      // JWT có dạng: header.payload.signature
      const payload = JSON.parse(atob(token.split(".")[1]));
      // exp là thời gian hết hạn (tính bằng giây)
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (error) {
      console.error("Error decoding token:", error);
      // Nếu lỗi khi decode thì coi như token đã hết hạn
      return true;
    }
  },

  // Lấy token từ cookie
  getTokenData: (): DecodedToken | null => {
    const token = Cookies.get(CookiesContains.TOKEN);
    if (!token) return null;
    try {
      return JSON.parse(token) as DecodedToken;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  },

  // Lấy accessToken
  getAccessToken: (): string | null => {
    const tokenData = tokenManager.getTokenData();
    return tokenData ? tokenData.accessToken : null;
  },

  // Lấy refreshToken
  getRefreshToken: (): string | null => {
    const tokenData = tokenManager.getTokenData();
    return tokenData ? tokenData.refreshToken : null;
  },

  // Lấy email
  getEmail: (): string | null => {
    const tokenData = tokenManager.getTokenData();
    return tokenData ? tokenData.email : null;
  },

  // Lấy role
  getRole: (): string | null => {
    const tokenData = tokenManager.getTokenData();
    return tokenData ? tokenData.role : null;
  },

  // Phương thức xóa token khỏi cookie
  removeTokens: () => {
    Cookies.remove(CookiesContains.TOKEN);
  },

  // Phương thức cập nhật accessToken mới
  updateAccessToken: (newAccessToken: string) => {
    const tokenData = tokenManager.getTokenData();
    if (!tokenData) {
      console.error("No token data found to update accessToken.");
      return;
    }

    // Cập nhật giá trị accessToken và lưu lại token
    tokenData.accessToken = newAccessToken;
    tokenManager.setTokens(tokenData.accessToken, tokenData.refreshToken, {
      email: tokenData.email,
      role: tokenData.role,
    });
  },

  // Phương thức cập nhật refreshToken mới
  updateRefreshToken: (newRefreshToken: string) => {
    const tokenData = tokenManager.getTokenData();
    if (!tokenData) {
      console.error("No token data found to update refreshToken.");
      return;
    }

    // Cập nhật giá trị refreshToken và lưu lại token
    tokenData.refreshToken = newRefreshToken;
    tokenManager.setTokens(tokenData.accessToken, tokenData.refreshToken, {
      email: tokenData.email,
      role: tokenData.role,
    });
  },
};

export default tokenManager;
