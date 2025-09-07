import { postRequest, getWithParams } from "../utils/apiUtils";
import { Stage } from "../types/stage.type";

// Type definitions
interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

interface RefreshTokenParams {
  refreshToken: string;
}

interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordParams {
  email: string;
}

interface VerifyResetTokenParams {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdateProfileParams {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: File;
}

const AuthHandler = {
  login: async (params: LoginParams): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/login", params);
  },

  register: async (params: RegisterParams): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/register", params);
  },

  logout: async (): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/logout", {});
  },

  refreshToken: async (
    params: RefreshTokenParams
  ): Promise<Stage<string | null>> => {
    return postRequest("/tracker/auth/refresh-token", params);
  },

  changePassword: async (params: ChangePasswordParams): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/change-password", params);
  },

  forgotPassword: async (params: ResetPasswordParams): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/forgot-password", params);
  },

  resetPassword: async (
    params: VerifyResetTokenParams
  ): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/reset-password", params);
  },

  verifyEmail: async (token: string): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/verify-email", { token });
  },

  resendVerificationEmail: async (email: string): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/resend-verification", { email });
  },

  getProfile: async (): Promise<Stage<any>> => {
    return getWithParams("/tracker/auth/profile");
  },

  updateProfile: async (params: UpdateProfileParams): Promise<Stage<any>> => {
    // If avatar is included, use FormData
    if (params.avatar) {
      const formData = new FormData();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      return postRequest("/tracker/auth/update-profile", formData);
    }

    // Otherwise use regular JSON
    return postRequest("/tracker/auth/update-profile", params);
  },

  validateToken: async (token: string): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/validate-token", { token });
  },

  deleteAccount: async (password: string): Promise<Stage<any>> => {
    return postRequest("/tracker/auth/delete-account", { password });
  },
};

export default AuthHandler;
