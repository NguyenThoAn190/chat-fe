import { AxiosInstance } from "axios";
import tokenManager from "../utils/tokenManager";
import refreshToken from "../utils/refresh-token";
import { getLocale } from "../../utils/lang";

const applyRequestInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    async (config) => {
      // let token = tokenManager.getAccessToken();
      // const currentLocale = getLocale();

      // // Nếu không có token hoặc token hết hạn thì refresh
      // if (!token || tokenManager.isTokenExpired(token)) {
      //   try {
      //     const newToken = await refreshToken();
      //     if (newToken) {
      //       token = newToken;
      //       tokenManager.setAccessToken(newToken);
      //     }
      //   } catch (err) {
      //     if (err instanceof Error) {
      //       return Promise.reject(err);
      //     }
      //     return Promise.reject(
      //       new Error(typeof err === "string" ? err : JSON.stringify(err))
      //     );
      //   }
      // }

      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

      // if (currentLocale) {
      //   config.headers["lang"] = currentLocale;
      //   config.headers["Accept-Language"] = currentLocale;
      //   config.params = { ...(config.params || {}), lang: currentLocale };
      // }

      return config;
    },
    (error) => {
      if (error instanceof Error) {
        return Promise.reject(error);
      }
      return Promise.reject(
        new Error(typeof error === "string" ? error : JSON.stringify(error))
      );
    }
  );
};

export default applyRequestInterceptor;
