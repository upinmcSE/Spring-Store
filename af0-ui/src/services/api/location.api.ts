import type { ApiResponse } from '../../types/api.types';
import type { MapSpotLocation, WeekendAnnouncement } from '../../types/location.types';
import {
  INITIAL_ANNOUNCEMENT,
  INITIAL_MAP_SPOTS,
  MOCK_STORAGE_KEYS,
  readMockStorage,
  writeMockStorage,
} from '../mock/mockData';
import { API_ENDPOINTS } from './endpoints';
import { httpClient, isMockApiEnabled } from './httpClient';

export const locationApi = {
  async getWeekendAnnouncement(): Promise<WeekendAnnouncement> {
    if (isMockApiEnabled()) {
      return readMockStorage<WeekendAnnouncement>(
        MOCK_STORAGE_KEYS.ANNOUNCEMENT,
        INITIAL_ANNOUNCEMENT,
      );
    }
    const { data } = await httpClient.get<ApiResponse<WeekendAnnouncement>>(
      API_ENDPOINTS.PUBLIC.ANNOUNCEMENT,
    );
    return data.data;
  },

  async getMapSpots(): Promise<MapSpotLocation[]> {
    if (isMockApiEnabled()) {
      return readMockStorage<MapSpotLocation[]>(MOCK_STORAGE_KEYS.SPOTS, INITIAL_MAP_SPOTS);
    }
    const { data } = await httpClient.get<ApiResponse<MapSpotLocation[]>>(
      API_ENDPOINTS.PUBLIC.MAP_SPOTS,
    );
    return data.data;
  },

  // ================= ADMIN UPDATE APIs =================
  async updateAnnouncementAdmin(
    announcement: WeekendAnnouncement,
  ): Promise<WeekendAnnouncement> {
    if (isMockApiEnabled()) {
      writeMockStorage(MOCK_STORAGE_KEYS.ANNOUNCEMENT, announcement);
      return announcement;
    }
    const { data } = await httpClient.put<ApiResponse<WeekendAnnouncement>>(
      API_ENDPOINTS.ADMIN.ANNOUNCEMENT,
      announcement,
    );
    return data.data;
  },

  async updateMapSpotAdmin(spot: MapSpotLocation): Promise<MapSpotLocation> {
    if (isMockApiEnabled()) {
      const list = readMockStorage<MapSpotLocation[]>(
        MOCK_STORAGE_KEYS.SPOTS,
        INITIAL_MAP_SPOTS,
      );
      const idx = list.findIndex((s) => s.id === spot.id);
      if (idx >= 0) {
        list[idx] = spot;
        writeMockStorage(MOCK_STORAGE_KEYS.SPOTS, list);
      }
      return spot;
    }
    const { data } = await httpClient.put<ApiResponse<MapSpotLocation>>(
      API_ENDPOINTS.ADMIN.MAP_SPOT_DETAIL(spot.id),
      spot,
    );
    return data.data;
  },
};

