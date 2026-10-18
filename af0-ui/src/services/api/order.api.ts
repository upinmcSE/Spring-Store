import type { ApiResponse } from '../../types/api.types';
import type {
  GuestOrderRequest,
  OrderRecord,
  OrderStatus,
} from '../../types/order.types';
import {
  INITIAL_ORDERS,
  MOCK_STORAGE_KEYS,
  readMockStorage,
  writeMockStorage,
} from '../mock/mockData';
import { API_ENDPOINTS } from './endpoints';
import { httpClient, isMockApiEnabled } from './httpClient';

export const orderApi = {
  // Khách hàng đặt mua nhanh không cần đăng nhập
  async placeGuestOrder(payload: GuestOrderRequest): Promise<OrderRecord> {
    if (isMockApiEnabled()) {
      await new Promise((r) => setTimeout(r, 350));
      const orders = readMockStorage<OrderRecord[]>(
        MOCK_STORAGE_KEYS.ORDERS,
        INITIAL_ORDERS,
      );
      const newOrder: OrderRecord = {
        ...payload,
        id: `ord-${Date.now()}`,
        orderCode: `LS-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${String(
          orders.length + 1,
        ).padStart(2, '0')}`,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
      const updated = [newOrder, ...orders];
      writeMockStorage(MOCK_STORAGE_KEYS.ORDERS, updated);
      return newOrder;
    }

    const { data } = await httpClient.post<ApiResponse<OrderRecord>>(
      API_ENDPOINTS.PUBLIC.GUEST_CHECKOUT,
      payload,
    );
    return data.data;
  },

  // Admin: Lấy danh sách đơn đặt hàng
  async getOrdersAdmin(statusFilter?: OrderStatus | 'ALL'): Promise<OrderRecord[]> {
    if (isMockApiEnabled()) {
      const orders = readMockStorage<OrderRecord[]>(
        MOCK_STORAGE_KEYS.ORDERS,
        INITIAL_ORDERS,
      );
      if (!statusFilter || statusFilter === 'ALL') return orders;
      return orders.filter((o) => o.status === statusFilter);
    }

    const { data } = await httpClient.get<ApiResponse<OrderRecord[]>>(
      API_ENDPOINTS.ADMIN.ORDERS,
      {
        params: statusFilter && statusFilter !== 'ALL' ? { status: statusFilter } : undefined,
      },
    );
    return data.data;
  },

  // Admin: Cập nhật trạng thái đơn hàng
  async updateOrderStatusAdmin(
    orderId: string,
    status: OrderStatus,
  ): Promise<OrderRecord> {
    if (isMockApiEnabled()) {
      const orders = readMockStorage<OrderRecord[]>(
        MOCK_STORAGE_KEYS.ORDERS,
        INITIAL_ORDERS,
      );
      const idx = orders.findIndex((o) => o.id === orderId);
      if (idx < 0) throw new Error('Không tìm thấy đơn hàng.');
      orders[idx] = { ...orders[idx], status };
      writeMockStorage(MOCK_STORAGE_KEYS.ORDERS, orders);
      return orders[idx];
    }

    const { data } = await httpClient.patch<ApiResponse<OrderRecord>>(
      API_ENDPOINTS.ADMIN.ORDER_STATUS(orderId),
      { status },
    );
    return data.data;
  },
};

