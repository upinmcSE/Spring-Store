import type {
  BeanProduct,
  DrinkItem,
  GearProduct,
  GrindOption,
  ProcessMethodStory,
} from '../../types/product.types';
import type { MapSpotLocation, WeekendAnnouncement } from '../../types/location.types';
import type { ContactRecord, OrderRecord } from '../../types/order.types';

export const GRIND_OPTIONS: { value: GrindOption; label: string }[] = [
  { value: 'Nguyên hạt', label: 'Để Nguyên Hạt' },
  { value: 'Xay Pour Over / V60', label: 'Xay Pour Over / V60' },
  { value: 'Xay Pha Phin', label: 'Xay Pha Phin' },
  { value: 'Xay Máy Espresso', label: 'Xay Máy Espresso' },
  { value: 'Xay Cold Brew', label: 'Xay Ủ Cold Brew' },
];

export const PROCESS_METHODS_STORY: ProcessMethodStory[] = [
  {
    id: 'washed',
    stepBadge: '1. Sơ chế Ướt (Washed)',
    badgeBgColor: '#E0F2FE',
    badgeTextColor: '#075985',
    representativeName: 'Đại diện: LY COFFEE',
    description:
      'Xay bỏ vỏ và thịt quả ngay sau khi hái, ngâm ủ lên men để phân hủy lớp nhầy, rửa sạch với nước suối rồi phơi khô. Cho ra hạt cà phê có độ sạch cao, vị chua (acidity) sáng rõ và hương hoa trắng thanh tao.',
    ctaText: 'Đặt mua gói Ly Coffee →',
    targetBeanId: 'ly-coffee',
  },
  {
    id: 'honey',
    stepBadge: '2. Sơ chế Mật Ong (Honey)',
    badgeBgColor: '#FEF3C7',
    badgeTextColor: '#92400E',
    representativeName: 'Đại diện: KAO COFFEE',
    description:
      'Lấy cảm hứng từ sự dịu dàng của chú cún Kao. Xát bỏ vỏ ngoài nhưng giữ lại lớp nhầy ngọt (pectin) trên hạt khi phơi giàn. Tạo nên vị ngọt dịu như caramel, cân bằng hoàn hảo giữa độ chua trái cây và độ đậm.',
    ctaText: 'Đặt mua gói Kao Coffee →',
    targetBeanId: 'kao-coffee',
  },
  {
    id: 'natural',
    stepBadge: '3. Sơ chế Khô (Natural)',
    badgeBgColor: '#FFE4E6',
    badgeTextColor: '#9F1239',
    representativeName: 'Đại diện: BƯ COFFEE',
    description:
      'Kiêu kỳ và đậm đà như "hoàng thượng" Bư. Quả cà phê chín mọng được phơi nguyên quả dưới nắng Tây Bắc 25–30 ngày. Giữ trọn thân vị (body) dày dặn, vị ngọt đậm sâu và nốt hương trái cây chín nhiệt đới.',
    ctaText: 'Đặt mua gói Bư Coffee →',
    targetBeanId: 'bu-coffee',
  },
];

export const INITIAL_BEANS_DATA: BeanProduct[] = [
  {
    id: 'ly-coffee',
    name: 'LY COFFEE — Arabica Sơn La Washed',
    badge: '1. Sơ chế Ướt (Washed)',
    roast: 'Light Roast (Rang sáng)',
    origin: '100% Arabica Sơn La',
    price250: 155000,
    price500: 290000,
    story:
      'Phương pháp sơ chế ướt tạo ra hạt cà phê có độ sạch cao nhất, vị chua (acidity) sáng rõ và hương hoa trắng thanh khiết của núi rừng Tây Bắc. Rất hợp cho Pour Over, Espresso hiện đại và Cold Brew.',
    notes: ['Hương hoa trắng', 'Chua thanh sáng', 'Hậu ngọt sạch'],
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: 'kao-coffee',
    name: 'KAO COFFEE — Arabica Sơn La Honey',
    badge: '2. Sơ chế Mật Ong (Honey)',
    roast: 'Light Roast (Rang sáng)',
    origin: '100% Arabica Sơn La',
    price250: 165000,
    price500: 310000,
    story:
      'Lấy cảm hứng từ sự dịu dàng của chú cún Kao. Giữ lại lớp nhầy pectin ngọt tự nhiên khi phơi trên giàn, mang đến vị ngọt dịu như caramel, cân bằng tuyệt vời giữa hương hoa, vị chua trái cây và độ đậm.',
    notes: ['Ngọt Caramel', 'Hương hoa rừng', 'Trái cây tươi'],
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: 'bu-coffee',
    name: 'BƯ COFFEE — Arabica Sơn La Natural',
    badge: '3. Sơ chế Khô (Natural)',
    roast: 'Light / Light+ (Rang vừa)',
    origin: '100% Arabica Sơn La',
    price250: 175000,
    price500: 330000,
    story:
      'Mang nét kiêu kỳ của "hoàng thượng" mèo Bư. Quả cà phê chín mọng được phơi nguyên quả dưới nắng mặt trời 25–30 ngày, giữ trọn thân vị (body) dày dặn, vị ngọt đậm và nốt hương trái cây chín nồng nàn.',
    notes: ['Trái cây chín', 'Body dày dặn', 'Ngọt đậm sâu'],
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: 'lason-phin-blend',
    name: 'LA SƠN BLEND — Phin & Sữa Đá Tây Bắc',
    badge: 'Phối trộn truyền thống & hiện đại',
    roast: 'Medium Roast (Rang vừa)',
    origin: 'Arabica Sơn La & Fine Robusta',
    price250: 135000,
    price500: 255000,
    story:
      'Sự kết hợp giữa hương thơm quyến rũ của Arabica Sơn La và độ đậm đà sô-cô-la của Fine Robusta, thiết kế riêng cho người yêu cà phê Phin và Cà phê sữa đá mỗi sáng.',
    notes: ['Sô-cô-la đen', 'Hạt dẻ nướng', 'Đậm đà hậu ngọt'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
];

export const INITIAL_DRINKS_DATA: DrinkItem[] = [
  {
    id: 'drink-v60',
    name: 'V60 Pour Over — Hạt Ly / Kao / Bư',
    price: 45000,
    priceLabel: '45.000đ',
    availableAt: 'truck',
    badgeText: '🚐 Có tại Quán & Xe Lưu Động',
    baseBean: 'Tùy chọn hạt Ly (Washed), Kao (Honey) hoặc Bư (Natural)',
    desc: 'Chiết xuất thủ công qua giấy lọc giúp bóc tách trọn vẹn hương hoa, vị chua thanh trái cây và hậu vị ngọt sâu của hạt Arabica Sơn La.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80',
    active: true,
  },
  {
    id: 'drink-coldbrew',
    name: 'Cold Brew Sơn La Ủ Lạnh 18 Giờ',
    price: 45000,
    priceLabel: '45.000đ',
    availableAt: 'truck',
    badgeText: '🚐 Có tại Quán & Xe Lưu Động',
    baseBean: 'Nền hạt Bư Coffee (Natural) hương trái cây chín',
    desc: 'Ủ lạnh suốt 18 giờ từ hạt Bư Coffee sơ chế tự nhiên, mang lại cảm giác sảng khoái, thơm lừng hương quả mọng nhiệt đới.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80',
    active: true,
  },
  {
    id: 'drink-milk-coffee',
    name: 'Cà Phê Sữa Tươi Mộc Châu ("Uống Là Cười")',
    price: 35000,
    priceLabel: '35.000đ',
    availableAt: 'truck',
    badgeText: '🚐 Có tại Quán & Xe Lưu Động',
    baseBean: 'Nền Espresso Kao Coffee & Sữa tươi Mộc Châu',
    desc: 'Sự giao thoa ngọt ngào giữa hạt Arabica Honey Sơn La và dòng sữa tươi béo thơm đặc trưng của cao nguyên Mộc Châu.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80',
    active: true,
  },
  {
    id: 'drink-oolong-milk',
    name: 'Trà Ô Long Sữa Thảo Nguyên',
    price: 38000,
    priceLabel: '38.000đ',
    availableAt: 'truck',
    badgeText: '🚐 Có tại Quán & Xe Lưu Động',
    baseBean: 'Trà Ô Long Mộc Châu ủ đậm vị',
    desc: 'Một phần trong "Hành trình Cafe - Trà - Sữa" của La Sơn: trà Ô Long vùng cao chát dịu hòa quyện cùng sữa thơm dịu nhẹ.',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=700&q=80',
    active: true,
  },
  {
    id: 'drink-tasting-flight',
    name: 'Combo Thử Nếm 3 Sơ Chế (Tasting Flight)',
    price: 79000,
    priceLabel: '79.000đ',
    availableAt: 'shop',
    badgeText: '🏠 Độc quyền tại Quán 216 Hoàng Quốc Việt',
    baseBean: 'Trọn bộ 3 ly nhỏ: Ly (Washed) + Kao (Honey) + Bư (Natural)',
    desc: 'Trải nghiệm so sánh trực tiếp 3 phương pháp sơ chế cà phê Sơn La cùng lời thuyết minh trực tiếp từ Dr. Thắng tại quầy bar.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80',
    active: true,
  },
  {
    id: 'drink-espresso-tonic',
    name: 'Espresso Tonic Mận Đỏ Tây Bắc',
    price: 48000,
    priceLabel: '48.000đ',
    availableAt: 'shop',
    badgeText: '🏠 Độc quyền tại Quán 216 Hoàng Quốc Việt',
    baseBean: 'Double Shot Ly Coffee + Syrup Mận Mộc Châu',
    desc: 'Tầng vị chua thanh của mận chín Mộc Châu kết hợp cùng lớp crema Espresso sáng vị tạo nên thức uống "chữa lành" đầy năng lượng.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    active: true,
  },
];

export const INITIAL_GEAR_DATA: GearProduct[] = [
  {
    id: 'gear-v60',
    name: 'Phễu Gốm V60 Kèm Giấy Lọc (Cỡ 02)',
    price: 185000,
    desc: 'Dụng cụ lý tưởng nhất để pha hạt Ly Coffee & Kao Coffee rang sáng.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'gear-kettle',
    name: 'Ấm Cổ Ngỗng Kiểm Soát Dòng Nước 600ml',
    price: 320000,
    desc: 'Thép không gỉ sơn tĩnh điện giúp rót vòng tròn ổn định khi pha Pour Over.',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'gear-grinder',
    name: 'Cối Xay Cà Phê Thủ Công Lưỡi Thép CNC',
    price: 590000,
    desc: 'Tuỳ chỉnh 24 nấc độ mịn từ Espresso, Phin đến V60 và Cold Brew.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'gear-phin',
    name: "Phin Nhôm Anodized Khắc Logo Ls'",
    price: 95000,
    desc: 'Phin nhôm cao cấp giữ nhiệt đều, chiết xuất đậm đà không bám mùi kim loại.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
];

export const INITIAL_MAP_SPOTS: MapSpotLocation[] = [
  {
    id: 'spot-roastery',
    title: '🏠 Quán & Xưởng Rang Cố Định La Sơn',
    shortLabel: '🏠 Quán Cố Định (Vân Sơn)',
    spotType: 'shop',
    time: 'Thứ 2 – Chủ Nhật (07:00 – 21:30)',
    address: '216 Hoàng Quốc Việt, Phường Vân Sơn, Mộc Châu, Sơn La',
    coords: [20.8445, 104.6412],
    note: 'Không gian thưởng thức trọn bộ Ly - Kao - Bư Coffee và giao lưu cùng Dr. Thắng.',
  },
  {
    id: 'spot-saturday-truck',
    title: '🚐 Xe Lưu Động — Sáng Thứ Bảy',
    shortLabel: '🚐 Thứ 7: Đồi Thông Bản Áng',
    spotType: 'truck',
    time: 'Thứ 7 tuần này (06:30 – 11:30)',
    address: 'Cổng Rừng Thông Bản Áng, Đông Sang, Mộc Châu, Sơn La',
    coords: [20.8242, 104.6615],
    note: 'Có ghế xếp camping dưới tán thông, phục vụ Pour Over nóng & Cold Brew.',
  },
  {
    id: 'spot-sunday-truck',
    title: '🚐 Xe Lưu Động — Sáng Chủ Nhật',
    shortLabel: '🚐 Chủ Nhật: Đồi Chè Trái Tim',
    spotType: 'truck',
    time: 'Chủ Nhật tuần này (06:30 – 11:30)',
    address: 'Đồi Chè Trái Tim (Tiểu khu Nông Trường), Mộc Châu, Sơn La',
    coords: [20.8715, 104.688],
    note: 'Điểm săn sương sớm và thưởng thức Cà phê sữa tươi Mộc Châu nóng hổi.',
  },
];

export const INITIAL_ANNOUNCEMENT: WeekendAnnouncement = {
  badgeText: '🚐 LASON TRUCK CUỐI TUẦN NÀY',
  saturdaySchedule: 'Đồi Thông Bản Áng (6h30 - 11h30)',
  sundaySchedule: 'Đồi Chè Trái Tim Mộc Châu (6h30 - 11h30)',
  ctaLabel: 'Xem tọa độ bản đồ →',
  isActive: true,
};

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord-1001',
    orderCode: 'LS-241018-01',
    customerName: 'Trần Minh Tuấn',
    customerPhone: '0912345678',
    deliveryMode: 'Nhận tại Quán / Xe Lưu Động Cuối Tuần',
    deliveryAddress: 'Nhận sáng Thứ 7 tại Đồi Thông Bản Áng',
    note: 'Cho mình xay cỡ V60 luôn nhé Dr. Thắng!',
    items: [
      {
        key: 'ly-coffee-250g-Xay Pour Over / V60',
        productId: 'ly-coffee',
        productType: 'bean',
        name: 'LY COFFEE — Arabica Sơn La Washed',
        variant: '250g • Xay Pour Over / V60',
        price: 155000,
        qty: 1,
      },
      {
        key: 'kao-coffee-250g-Nguyên hạt',
        productId: 'kao-coffee',
        productType: 'bean',
        name: 'KAO COFFEE — Arabica Sơn La Honey',
        variant: '250g • Nguyên hạt',
        price: 165000,
        qty: 1,
      },
    ],
    subTotal: 320000,
    shippingFee: 0,
    grandTotal: 320000,
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'ord-1002',
    orderCode: 'LS-241017-08',
    customerName: 'Lê Thu Hà',
    customerPhone: '0987654321',
    deliveryMode: 'Giao tận nhà (COD toàn quốc)',
    deliveryAddress: 'Số 45 Nguyễn Chí Thanh, Đống Đa, Hà Nội',
    note: 'Giao giờ hành chính giúp mình',
    items: [
      {
        key: 'bu-coffee-500g-Nguyên hạt',
        productId: 'bu-coffee',
        productType: 'bean',
        name: 'BƯ COFFEE — Arabica Sơn La Natural',
        variant: '500g • Nguyên hạt',
        price: 330000,
        qty: 1,
      },
      {
        key: 'gear-v60',
        productId: 'gear-v60',
        productType: 'gear',
        name: 'Phễu Gốm V60 Kèm Giấy Lọc (Cỡ 02)',
        variant: 'Dụng cụ pha chế',
        price: 185000,
        qty: 1,
      },
    ],
    subTotal: 515000,
    shippingFee: 0,
    grandTotal: 515000,
    status: 'CONFIRMED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

export const INITIAL_CONTACTS: ContactRecord[] = [
  {
    id: 'cnt-01',
    fullName: 'Phạm Hoàng Nam (Quán Acoustic Cầu Giấy)',
    phone: '0904112233',
    message:
      'Chào Dr. Thắng, mình muốn hỏi chính sách sỉ hạt Kao Coffee (Honey) và Bư Coffee (Natural) cho quán cà phê specialty tại Hà Nội.',
    status: 'NEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: 'cnt-02',
    fullName: 'Nguyễn Mai Phương',
    phone: '0936998877',
    message: 'Sáng Chủ Nhật này xe lưu động ở Đồi Chè Trái Tim có phục vụ Combo Tasting 3 loại hạt không ạ?',
    status: 'CONTACTED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
  },
];

// Helper đọc/ghi dữ liệu giả lập vào localStorage để đồng bộ giữa Storefront và Admin Dashboard
export function readMockStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeMockStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to write mock storage:', err);
  }
}

export const MOCK_STORAGE_KEYS = {
  BEANS: 'lason_mock_beans_v1',
  DRINKS: 'lason_mock_drinks_v1',
  GEAR: 'lason_mock_gear_v1',
  SPOTS: 'lason_mock_spots_v1',
  ANNOUNCEMENT: 'lason_mock_announcement_v1',
  ORDERS: 'lason_mock_orders_v1',
  CONTACTS: 'lason_mock_contacts_v1',
} as const;

