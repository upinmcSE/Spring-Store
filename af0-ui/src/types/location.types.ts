export interface MapSpotLocation {
  id: string;
  title: string;
  shortLabel: string;
  spotType: 'shop' | 'truck';
  time: string;
  address: string;
  coords: [number, number];
  note: string;
}

export interface WeekendAnnouncement {
  badgeText: string;
  saturdaySchedule: string;
  sundaySchedule: string;
  ctaLabel: string;
  isActive: boolean;
}

