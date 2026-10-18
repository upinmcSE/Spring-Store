import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorPayload } from '../../types/api.types';

export const ADMIN_TOKEN_STORAGE_KEY = 'lason_admin_access_token';
export const ADMIN_USER_STORAGE_KEY = 'lason_admin_user';

/**
 * Cờ kiểm tra đang chạy chế độ Mock hay gọi Backend thật.
 * Mặc định là `true` cho đến khi bạn cung cấp BE và đặt `VITE_USE_MOCK_API=false`.
 */
export const isMockApiEnabled = (): boolean => {
  const envVal = import.meta.env.VITE_USE_MOCK_API;
  if (envVal === undefined || envVal === '') {
    return true;
  }
  return envVal === 'true';
};

/**
 * Đường dẫn bí mật vào trang Admin Portal.
 * Có thể tùy chỉnh qua biến môi trường `VITE_ADMIN_BASE_PATH`.
 */
export const getAdminBasePath = (): string => {
  const raw = import.meta.env.VITE_ADMIN_BASE_PATH || '/ls-admin-portal';
  return raw.startsWith('/') ? raw : `/${raw}`;
};

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Tự động đính kèm JWT Token và ngôn ngữ hiện tại (Accept-Language)
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
    const currentLang = localStorage.getItem('lason_lang_v1') || 'vi';
    if (config.headers) {
      config.headers['Accept-Language'] = currentLang;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response Interceptor: Chuẩn hóa lỗi và xử lý khi hết hạn phiên đăng nhập (401)
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
    }
    const message =
      error.response?.data?.message ||
      error.message ||
      'Không thể kết nối tới máy chủ La Sơn Coffee Roastery.';
    return Promise.reject(new Error(message));
  },
);

