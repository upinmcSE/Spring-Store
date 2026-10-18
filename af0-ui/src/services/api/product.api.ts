import type { ApiResponse } from '../../types/api.types';
import type {
  BeanProduct,
  DrinkItem,
  DrinkVenueType,
  GearProduct,
} from '../../types/product.types';
import { formatVND } from '../../utils/formatters';
import {
  INITIAL_BEANS_DATA,
  INITIAL_DRINKS_DATA,
  INITIAL_GEAR_DATA,
  MOCK_STORAGE_KEYS,
  readMockStorage,
  writeMockStorage,
} from '../mock/mockData';
import { API_ENDPOINTS } from './endpoints';
import { httpClient, isMockApiEnabled } from './httpClient';

export const productApi = {
  // ================= PUBLIC STOREFRONT APIs =================
  async getBeans(): Promise<BeanProduct[]> {
    if (isMockApiEnabled()) {
      const all = readMockStorage<BeanProduct[]>(MOCK_STORAGE_KEYS.BEANS, INITIAL_BEANS_DATA);
      return all.filter((b) => b.inStock !== false);
    }
    const { data } = await httpClient.get<ApiResponse<BeanProduct[]>>(
      API_ENDPOINTS.PUBLIC.BEANS,
    );
    return data.data;
  },

  async getDrinks(venueFilter: 'all' | DrinkVenueType = 'all'): Promise<DrinkItem[]> {
    if (isMockApiEnabled()) {
      const all = readMockStorage<DrinkItem[]>(MOCK_STORAGE_KEYS.DRINKS, INITIAL_DRINKS_DATA);
      const activeList = all.filter((d) => d.active !== false);
      if (venueFilter === 'all') return activeList;
      return activeList.filter((d) => d.availableAt === venueFilter);
    }
    const { data } = await httpClient.get<ApiResponse<DrinkItem[]>>(
      API_ENDPOINTS.PUBLIC.DRINKS,
      { params: venueFilter === 'all' ? undefined : { availableAt: venueFilter } },
    );
    return data.data;
  },

  async getGear(): Promise<GearProduct[]> {
    if (isMockApiEnabled()) {
      const all = readMockStorage<GearProduct[]>(MOCK_STORAGE_KEYS.GEAR, INITIAL_GEAR_DATA);
      return all.filter((g) => g.inStock !== false);
    }
    const { data } = await httpClient.get<ApiResponse<GearProduct[]>>(
      API_ENDPOINTS.PUBLIC.GEAR,
    );
    return data.data;
  },

  // ================= ADMIN PROTECTED CRUD APIs =================
  async getAllBeansAdmin(): Promise<BeanProduct[]> {
    if (isMockApiEnabled()) {
      return readMockStorage<BeanProduct[]>(MOCK_STORAGE_KEYS.BEANS, INITIAL_BEANS_DATA);
    }
    const { data } = await httpClient.get<ApiResponse<BeanProduct[]>>(
      API_ENDPOINTS.ADMIN.BEANS,
    );
    return data.data;
  },

  async saveBeanAdmin(bean: BeanProduct): Promise<BeanProduct> {
    if (isMockApiEnabled()) {
      const list = readMockStorage<BeanProduct[]>(MOCK_STORAGE_KEYS.BEANS, INITIAL_BEANS_DATA);
      const idx = list.findIndex((b) => b.id === bean.id);
      if (idx >= 0) {
        list[idx] = bean;
      } else {
        list.push(bean);
      }
      writeMockStorage(MOCK_STORAGE_KEYS.BEANS, list);
      return bean;
    }
    const { data } = await httpClient.put<ApiResponse<BeanProduct>>(
      API_ENDPOINTS.ADMIN.BEAN_DETAIL(bean.id),
      bean,
    );
    return data.data;
  },

  async getAllDrinksAdmin(): Promise<DrinkItem[]> {
    if (isMockApiEnabled()) {
      return readMockStorage<DrinkItem[]>(MOCK_STORAGE_KEYS.DRINKS, INITIAL_DRINKS_DATA);
    }
    const { data } = await httpClient.get<ApiResponse<DrinkItem[]>>(
      API_ENDPOINTS.ADMIN.DRINKS,
    );
    return data.data;
  },

  async saveDrinkAdmin(drink: DrinkItem): Promise<DrinkItem> {
    const normalized: DrinkItem = {
      ...drink,
      priceLabel: formatVND(drink.price),
      badgeText:
        drink.availableAt === 'truck'
          ? '🚐 Có tại Quán & Xe Lưu Động'
          : '🏠 Độc quyền tại Quán 216 Hoàng Quốc Việt',
    };
    if (isMockApiEnabled()) {
      const list = readMockStorage<DrinkItem[]>(MOCK_STORAGE_KEYS.DRINKS, INITIAL_DRINKS_DATA);
      const idx = list.findIndex((d) => d.id === normalized.id);
      if (idx >= 0) {
        list[idx] = normalized;
      } else {
        list.push(normalized);
      }
      writeMockStorage(MOCK_STORAGE_KEYS.DRINKS, list);
      return normalized;
    }
    const { data } = await httpClient.put<ApiResponse<DrinkItem>>(
      API_ENDPOINTS.ADMIN.DRINK_DETAIL(normalized.id),
      normalized,
    );
    return data.data;
  },

  async getAllGearAdmin(): Promise<GearProduct[]> {
    if (isMockApiEnabled()) {
      return readMockStorage<GearProduct[]>(MOCK_STORAGE_KEYS.GEAR, INITIAL_GEAR_DATA);
    }
    const { data } = await httpClient.get<ApiResponse<GearProduct[]>>(
      API_ENDPOINTS.ADMIN.GEAR,
    );
    return data.data;
  },

  async saveGearAdmin(gear: GearProduct): Promise<GearProduct> {
    if (isMockApiEnabled()) {
      const list = readMockStorage<GearProduct[]>(MOCK_STORAGE_KEYS.GEAR, INITIAL_GEAR_DATA);
      const idx = list.findIndex((g) => g.id === gear.id);
      if (idx >= 0) {
        list[idx] = gear;
      } else {
        list.push(gear);
      }
      writeMockStorage(MOCK_STORAGE_KEYS.GEAR, list);
      return gear;
    }
    const { data } = await httpClient.put<ApiResponse<GearProduct>>(
      API_ENDPOINTS.ADMIN.GEAR_DETAIL(gear.id),
      gear,
    );
    return data.data;
  },
};

