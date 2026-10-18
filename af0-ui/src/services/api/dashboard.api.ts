import type { ApiResponse } from '../../types/api.types';
import type { DashboardSummary } from '../../types/auth.types';
import type { ContactRecord, OrderRecord } from '../../types/order.types';
import type { BeanProduct, GearProduct } from '../../types/product.types';
import {
  INITIAL_BEANS_DATA,
  INITIAL_CONTACTS,
  INITIAL_GEAR_DATA,
  INITIAL_ORDERS,
  MOCK_STORAGE_KEYS,
  readMockStorage,
} from '../mock/mockData';
import { API_ENDPOINTS } from './endpoints';
import { httpClient, isMockApiEnabled } from './httpClient';

export const dashboardApi = {
  async getSummary(): Promise<DashboardSummary> {
    if (isMockApiEnabled()) {
      const orders = readMockStorage<OrderRecord[]>(
        MOCK_STORAGE_KEYS.ORDERS,
        INITIAL_ORDERS,
      );
      const contacts = readMockStorage<ContactRecord[]>(
        MOCK_STORAGE_KEYS.CONTACTS,
        INITIAL_CONTACTS,
      );
      const beans = readMockStorage<BeanProduct[]>(
        MOCK_STORAGE_KEYS.BEANS,
        INITIAL_BEANS_DATA,
      );
      const gear = readMockStorage<GearProduct[]>(
        MOCK_STORAGE_KEYS.GEAR,
        INITIAL_GEAR_DATA,
      );

      const validOrders = orders.filter((o) => o.status !== 'CANCELLED');
      const totalRevenue = validOrders.reduce((sum, o) => sum + o.grandTotal, 0);
      const pendingOrdersCount = orders.filter((o) => o.status === 'PENDING').length;
      const unreadContactsCount = contacts.filter((c) => c.status === 'NEW').length;

      return {
        totalRevenue,
        totalOrders: orders.length,
        pendingOrdersCount,
        unreadContactsCount,
        activeBeanProducts: beans.filter((b) => b.inStock !== false).length,
        activeGearProducts: gear.filter((g) => g.inStock !== false).length,
      };
    }

    const { data } = await httpClient.get<ApiResponse<DashboardSummary>>(
      API_ENDPOINTS.ADMIN.DASHBOARD_SUMMARY,
    );
    return data.data;
  },
};

