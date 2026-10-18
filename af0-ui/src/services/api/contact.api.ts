import type { ApiResponse } from '../../types/api.types';
import type {
  ContactRecord,
  ContactRequest,
  ContactStatus,
} from '../../types/order.types';
import {
  INITIAL_CONTACTS,
  MOCK_STORAGE_KEYS,
  readMockStorage,
  writeMockStorage,
} from '../mock/mockData';
import { API_ENDPOINTS } from './endpoints';
import { httpClient, isMockApiEnabled } from './httpClient';

export const contactApi = {
  async submitContact(payload: ContactRequest): Promise<ContactRecord> {
    if (isMockApiEnabled()) {
      await new Promise((r) => setTimeout(r, 300));
      const list = readMockStorage<ContactRecord[]>(
        MOCK_STORAGE_KEYS.CONTACTS,
        INITIAL_CONTACTS,
      );
      const created: ContactRecord = {
        ...payload,
        id: `cnt-${Date.now()}`,
        status: 'NEW',
        createdAt: new Date().toISOString(),
      };
      writeMockStorage(MOCK_STORAGE_KEYS.CONTACTS, [created, ...list]);
      return created;
    }

    const { data } = await httpClient.post<ApiResponse<ContactRecord>>(
      API_ENDPOINTS.PUBLIC.CONTACTS,
      payload,
    );
    return data.data;
  },

  async getContactsAdmin(): Promise<ContactRecord[]> {
    if (isMockApiEnabled()) {
      return readMockStorage<ContactRecord[]>(
        MOCK_STORAGE_KEYS.CONTACTS,
        INITIAL_CONTACTS,
      );
    }

    const { data } = await httpClient.get<ApiResponse<ContactRecord[]>>(
      API_ENDPOINTS.ADMIN.CONTACTS,
    );
    return data.data;
  },

  async updateContactStatusAdmin(
    contactId: string,
    status: ContactStatus,
  ): Promise<ContactRecord> {
    if (isMockApiEnabled()) {
      const list = readMockStorage<ContactRecord[]>(
        MOCK_STORAGE_KEYS.CONTACTS,
        INITIAL_CONTACTS,
      );
      const idx = list.findIndex((c) => c.id === contactId);
      if (idx < 0) throw new Error('Không tìm thấy liên hệ.');
      list[idx] = { ...list[idx], status };
      writeMockStorage(MOCK_STORAGE_KEYS.CONTACTS, list);
      return list[idx];
    }

    const { data } = await httpClient.patch<ApiResponse<ContactRecord>>(
      API_ENDPOINTS.ADMIN.CONTACT_STATUS(contactId),
      { status },
    );
    return data.data;
  },
};

