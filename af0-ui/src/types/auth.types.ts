export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: 'OWNER' | 'ROASTER' | 'STAFF';
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: AdminUser;
}

export interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  pendingOrdersCount: number;
  unreadContactsCount: number;
  activeBeanProducts: number;
  activeGearProducts: number;
}

