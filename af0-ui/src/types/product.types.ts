export type BeanWeight = '250g' | '500g';

export type GrindOption =
  | 'Nguyên hạt'
  | 'Xay Pour Over / V60'
  | 'Xay Pha Phin'
  | 'Xay Máy Espresso'
  | 'Xay Cold Brew';

export interface BeanProduct {
  id: string;
  name: string;
  badge: string;
  roast: string;
  origin: string;
  price250: number;
  price500: number;
  story: string;
  notes: string[];
  image: string;
  inStock?: boolean;
}

export type DrinkVenueType = 'truck' | 'shop';

export interface DrinkItem {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  availableAt: DrinkVenueType;
  badgeText: string;
  baseBean: string;
  desc: string;
  image: string;
  active?: boolean;
}

export interface GearProduct {
  id: string;
  name: string;
  price: number;
  desc: string;
  image: string;
  inStock?: boolean;
}

export interface ProcessMethodStory {
  id: string;
  stepBadge: string;
  badgeBgColor: string;
  badgeTextColor: string;
  representativeName: string;
  description: string;
  ctaText: string;
  targetBeanId: string;
}

