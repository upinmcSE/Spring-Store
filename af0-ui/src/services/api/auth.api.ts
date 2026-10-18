import type { ApiResponse } from '../../types/api.types';
import type { AdminUser, LoginRequest, LoginResponse } from '../../types/auth.types';
import { API_ENDPOINTS } from './endpoints';
import {
  ADMIN_TOKEN_STORAGE_KEY,
  ADMIN_USER_STORAGE_KEY,
  httpClient,
  isMockApiEnabled,
} from './httpClient';

const DEFAULT_MOCK_ADMIN: AdminUser = {
  id: 'admin-dr-thang',
  username: 'admin',
  fullName: 'Dr. Thắng Rang Cà',
  role: 'OWNER',
  email: 'lasonroastery@gmail.com',
};

export const authApi = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    if (isMockApiEnabled()) {
      await new Promise((r) => setTimeout(r, 400));
      const userTrimmed = payload.username.trim().toLowerCase();
      // Chấp nhận tài khoản demo: admin / lason2026 (hoặc drthang / lason2026, admin / 123456)
      const isValidUser =
        userTrimmed === 'admin' ||
        userTrimmed === 'drthang' ||
        userTrimmed === 'lasonroastery@gmail.com';
      const isValidPass =
        payload.password === 'lason2026' ||
        payload.password === '123456' ||
        payload.password === 'admin123';

      if (!isValidUser || !isValidPass) {
        throw new Error(
          'Tài khoản hoặc mật khẩu không chính xác. (Demo: admin / lason2026)',
        );
      }

      const response: LoginResponse = {
        accessToken: `mock-jwt-token-${Date.now()}`,
        expiresIn: 86400,
        user: DEFAULT_MOCK_ADMIN,
      };
      localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, response.accessToken);
      localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(response.user));
      return response;
    }

    const { data } = await httpClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload,
    );
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.data.accessToken);
    localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(data.data.user));
    return data.data;
  },

  async logout(): Promise<void> {
    try {
      if (!isMockApiEnabled()) {
        await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      }
    } finally {
      localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
    }
  },

  async getCurrentAdmin(): Promise<AdminUser | null> {
    const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
    if (!token) return null;

    if (isMockApiEnabled()) {
      const saved = localStorage.getItem(ADMIN_USER_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as AdminUser) : DEFAULT_MOCK_ADMIN;
    }

    const { data } = await httpClient.get<ApiResponse<AdminUser>>(API_ENDPOINTS.AUTH.ME);
    return data.data;
  },
};

