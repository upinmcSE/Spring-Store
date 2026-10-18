/**
 * Định nghĩa tập trung tất cả các API Endpoints kết nối với Backend (AF0 Microservices Gateway).
 * Khi Backend sẵn sàng, chỉ cần cấu hình VITE_API_BASE_URL và VITE_USE_MOCK_API=false.
 */

export const API_ENDPOINTS = {
  // 1. Auth & Phiên đăng nhập Admin
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },

  // 2. Khách hàng (Public Storefront)
  PUBLIC: {
    ANNOUNCEMENT: '/locations/announcement',
    MAP_SPOTS: '/locations/spots',
    BEANS: '/products/beans',
    DRINKS: '/products/drinks',
    GEAR: '/products/gear',
    GUEST_CHECKOUT: '/orders/guest-checkout',
    CONTACTS: '/contacts',
  },

  // 3. Quản trị cửa hàng (Protected Admin APIs)
  ADMIN: {
    DASHBOARD_SUMMARY: '/admin/dashboard/summary',
    ORDERS: '/admin/orders',
    ORDER_STATUS: (orderId: string) => `/admin/orders/${orderId}/status`,
    BEANS: '/admin/products/beans',
    BEAN_DETAIL: (beanId: string) => `/admin/products/beans/${beanId}`,
    DRINKS: '/admin/products/drinks',
    DRINK_DETAIL: (drinkId: string) => `/admin/products/drinks/${drinkId}`,
    GEAR: '/admin/products/gear',
    GEAR_DETAIL: (gearId: string) => `/admin/products/gear/${gearId}`,
    ANNOUNCEMENT: '/admin/locations/announcement',
    MAP_SPOT_DETAIL: (spotId: string) => `/admin/locations/spots/${spotId}`,
    CONTACTS: '/admin/contacts',
    CONTACT_STATUS: (contactId: string) => `/admin/contacts/${contactId}/status`,
  },
} as const;

