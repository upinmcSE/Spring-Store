import type {
  BeanProduct,
  DrinkItem,
  GearProduct,
  GrindOption,
  ProcessMethodStory,
} from '../types/product.types';
import type { MapSpotLocation, WeekendAnnouncement } from '../types/location.types';

export type SupportedLanguage = 'vi' | 'en';

export const UI_TRANSLATIONS = {
  vi: {
    brand: {
      subtitle: 'La Sơn Coffee Roastery • Sơn La',
      footerTagline: 'Uống là cười, ngủ là mơ • Bác sĩ thú y rang cà phê tại Sơn La',
      footerAddress: '📍 216 Hoàng Quốc Việt, P. Vân Sơn, Sơn La | 📞 0386 423 993 | ✉️ lasonroastery@gmail.com',
    },
    announcement: {
      saturdayPrefix: 'Thứ 7:',
      sundayPrefix: 'Chủ Nhật:',
    },
    nav: {
      storyDesktop: '1. Câu Chuyện',
      storyMobile: '1. Câu Chuyện',
      beansDesktop: '2. Hạt Cà Phê Sơn La',
      beansMobile: '2. Hạt Rang',
      drinksDesktop: '3. Menu Quán & Xe',
      drinksMobile: '3. Đồ Uống',
      gearMapDesktop: '4. Thiết Bị & Bản Đồ Xe',
      gearMapMobile: '4. Thiết Bị & Bản Đồ',
      cartButton: 'Giỏ hàng',
    },
    storyPage: {
      heroBadge: '🐾 Bác Sĩ Thú Y Rang Cà Phê • Mộc Châu, Sơn La',
      heroTitlePrefix: 'Từ Tình Yêu Động Vật Đến Tách Cà Phê',
      heroTitleHighlight: '“Chữa Lành”',
      heroDesc:
        'Một hành trình Cà phê - Trà - Sữa của một người con sinh ra tại Sơn La. Mang sự chỉn chu, khoa học của một bác sĩ thú y và tình yêu thuần khiết với những người bạn bốn chân vào từng mẻ hạt Arabica Tây Bắc.',
      heroQuote:
        '“Uống là cười, ngủ là mơ — Chào mừng bạn đến với thế giới cà phê của Dr. Thắng Rang Cà!”',
      ctaBeans: 'Khám Phá Bộ 3 Hạt: Ly • Kao • Bư →',
      ctaMap: '🚐 Xem Bản Đồ Xe Cà Phê Cuối Tuần',
      cardAddress: '216 Hoàng Quốc Việt, P. Vân Sơn, Sơn La',
      cardPoint1Title: 'Tư duy khoa học từ phòng khám:',
      cardPoint1Body:
        'Theo dõi sát sao từng biểu đồ nhiệt độ, căn chỉnh từng giây trong lồng rang như cách chăm sóc một sự sống nhỏ.',
      cardPoint2Title: 'Cảm hứng từ thú cưng:',
      cardPoint2Body:
        'Mỗi túi cà phê mang tên một người bạn nhỏ — từ cô nàng Ly thanh sạch, chú cún Kao ngọt ngào đến hoàng thượng mèo Bư kiêu kỳ.',
      scheduleBoxTitle: '📍 Điểm Hẹn Cà Phê Tuần Này',
      scheduleShopLabel: '🏠 Tại Quán (Thứ 2 - CN):',
      scheduleShopVal: '216 Hoàng Quốc Việt, Vân Sơn',
      scheduleSatLabel: '🚐 Thứ 7 (6h30 - 11h30):',
      scheduleSatVal: 'Đồi Thông Bản Áng',
      scheduleSunLabel: '🚐 Chủ Nhật (6h30 - 11h30):',
      scheduleSunVal: 'Đồi Chè Trái Tim Mộc Châu',
      brandStoryEyebrow: 'Câu Chuyện Thương Hiệu',
      brandStoryTitle: 'Khi Người Cầm Ống Nghe Bệnh Bước Vào Xưởng Rang',
      brandStoryP1:
        'Người ta thường biết đến tôi với vai trò là một bác sĩ thú y – người hằng ngày chăm sóc, chữa trị và lắng nghe ngôn ngữ của những người bạn bốn chân. Công việc ấy dạy cho tôi sự kiên nhẫn, sự thấu hiểu và lòng trắc ẩn sâu sắc đối với mọi sự sống.',
      brandStoryP2:
        'Nhiều năm làm nghề y, tách cà phê mỗi sáng không chỉ giúp tôi tỉnh táo trước những ca đỡ đẻ hay phẫu thuật căng thẳng, mà dần trở thành một “người bạn đồng hành” xoa dịu tinh thần. Từ đó, La Sơn Coffee Roastery ra đời tại vùng đất Mộc Châu, Sơn La.',
      pillar1Title: '1. Chăm chút như chăm sóc sự sống',
      pillar1Desc:
        'Tiếp cận hạt cà phê nhân xanh Sơn La bằng tư duy khoa học, kiểm soát biểu đồ nhiệt độ chuẩn xác để đánh thức hương hoa và vị ngọt tự nhiên.',
      pillar2Title: '2. Cà phê của sự kết nối & chữa lành',
      pillar2Desc:
        'Ba phương pháp sơ chế kinh điển (Washed, Honey, Natural) được hóa thân thành 3 cá tính thú cưng: Ly Coffee, Kao Coffee và Bư Coffee.',
      pillar3Title: '3. Quán nhỏ & Chuyến xe cuối tuần',
      pillar3Desc:
        'Ngoài không gian tại 216 Hoàng Quốc Việt (Vân Sơn), mỗi cuối tuần xe cà phê lưu động của La Sơn lại rong ruổi đến các điểm săn mây, đồi thông để pha cà phê nóng giữa thiên nhiên.',
      processEyebrow: '100% Arabica Sơn La Đặc Sản',
      processTitle: '3 Phương Pháp Sơ Chế — 3 Cá Tính Hạt',
      processSubtitle:
        'Từ cùng những trái cà phê chín đỏ trên sườn đồi Sơn La, cách sơ chế khác nhau tạo nên những dải hương vị kỳ diệu.',
    },
    beansPage: {
      eyebrow: 'Xưởng Rang La Sơn • 100% Arabica Sơn La',
      title: 'Gói Cà Phê Hạt Rang Mộc Đặc Sản',
      subtitle:
        'Chọn Nguyên hạt hoặc Xay sẵn miễn phí theo dụng cụ pha của bạn. Không cần đăng nhập tài khoản.',
      promoBold: 'Ưu đãi cuối tuần:',
      promoText: 'Chọn nhận hàng tại Xe Lưu Động La Sơn được tặng ngay 1 ly cà phê pha mới!',
      weightLabel: 'Khối lượng',
      grindLabel: 'Quy cách hạt',
      bagPrefix: 'Túi',
      addToCartBtn: '+ Thêm Vào Giỏ Hàng',
    },
    drinksPage: {
      badge: '☕ MENU TRẢI NGHIỆM TRỰC TIẾP (KHÔNG BÁN GIAO ONLINE)',
      title: 'Thưởng Thức Tách Cà Phê Nóng Tại Quán & Trên Xe Lưu Động',
      subtitle:
        'Để giữ trọn lớp crema và tầng hương tinh tế nhất của hạt Arabica Sơn La, các món đồ uống pha chế chỉ phục vụ trực tiếp tại Quán (216 Hoàng Quốc Việt, Vân Sơn) và trên Xe Cà Phê Lưu Động cuối tuần.',
      filterAll: 'Tất cả đồ uống',
      filterTruck: '🚐 Có trên Xe Lưu Động',
      filterShop: '🏠 Chỉ phục vụ tại Quán',
      baseBeanPrefix: 'Hạt nền:',
      viewMapBtn: '📍 Xem vị trí Quán & Xe Lưu Động để thưởng thức',
    },
    gearMapPage: {
      mapEyebrow: 'Bản Đồ Tương Tác Mộc Châu - Sơn La',
      mapTitle: 'Cuối Tuần Này Xe Cà Phê La Sơn Đỗ Ở Đâu?',
      mapSubtitle:
        'Bấm vào từng địa điểm bên dưới để xem vị trí chính xác trên bản đồ và khung giờ hoạt động.',
      gearEyebrow: 'Dụng Cụ Pha Chế Tại Nhà (Có Bán Online)',
      gearTitle: 'Thiết Bị Pha Cà Phê Thủ Công',
      gearSubtitle:
        'Được Dr. Thắng tuyển chọn để bạn dễ dàng tự pha Ly, Kao, Bư Coffee chuẩn vị ngay tại nhà.',
      buyGearBtn: '+ Chọn mua',
      contactEyebrow: 'Kết Nối Với La Sơn Coffee Roastery',
      contactTitle: 'Thông Tin Liên Hệ Cửa Hàng',
      contactDesc:
        'Bạn quan tâm đến Cà Phê Đặc Sản Sơn La, muốn đặt sỉ cho quán hoặc hỏi lịch đỗ xe lưu động? Liên hệ trực tiếp với Dr. Thắng:',
      addressLabel: 'Địa chỉ xưởng & quán:',
      addressValue: '216 Hoàng Quốc Việt, Phường Vân Sơn, Tỉnh Sơn La',
      hotlineLabel: 'Hotline / Zalo Đặt Hàng:',
      formTitle: 'Gửi Lời Nhắn / Đặt Lịch Giao Lưu Cùng Dr. Thắng',
      namePlaceholder: 'Họ và tên của bạn *',
      phonePlaceholder: 'Số điện thoại / Zalo *',
      msgPlaceholder:
        'Nội dung lời nhắn (Tư vấn hạt cà phê Sơn La, hỏi vị trí xe cà phê cuối tuần...)',
      submitBtn: 'Gửi Thông Tin Liên Hệ',
      submittingBtn: 'Đang gửi...',
      contactSuccessToast:
        'Cảm ơn bạn đã nhắn tin cho La Sơn Coffee Roastery! Dr. Thắng sẽ phản hồi qua SĐT/Zalo của bạn sớm nhất.',
    },
    cart: {
      drawerTitle: 'Giỏ Hàng & Đặt Mua Nhanh',
      drawerSubtitle: 'Không cần đăng nhập • Xác nhận đơn qua SĐT/Zalo',
      emptyCart: 'Giỏ hàng của bạn đang trống. Hãy chọn một gói Ly, Kao hoặc Bư Coffee nhé!',
      emptyOrderError:
        'Vui lòng chọn ít nhất 1 sản phẩm cà phê hạt hoặc dụng cụ trước khi đặt hàng!',
      recipientSectionTitle: 'Thông Tin Người Nhận Hàng',
      fullNameLabel: 'Họ và tên *',
      fullNamePlaceholder: 'Nguyễn Văn A',
      phoneLabel: 'Số điện thoại / Zalo *',
      phonePlaceholder: '09xx xxx xxx',
      deliveryModeLabel: 'Hình thức nhận hàng *',
      deliveryCodLabel: '🚚 Giao tận nơi toàn quốc',
      deliveryPickupLabel: '🚐 Nhận tại Quán / Xe Lưu Động (Tặng 1 ly cafe)',
      addressLabel: 'Địa chỉ nhận hàng hoặc Điểm hẹn Xe Lưu Động *',
      addressPlaceholder: 'Số nhà, đường, tỉnh thành (Hoặc ghi: Nhận sáng Thứ 7 tại Đồi Thông)',
      noteLabel: 'Ghi chú thêm cho Dr. Thắng',
      notePlaceholder: 'Ví dụ: Tư vấn thêm cách pha V60...',
      subTotalLabel: 'Tạm tính:',
      shippingFeeLabel: 'Phí vận chuyển:',
      freeShipping: 'Miễn phí',
      grandTotalLabel: 'Tổng thanh toán:',
      submitOrderBtn: 'XÁC NHẬN ĐẶT HÀNG (KHÔNG CẦN ĐĂNG NHẬP)',
      submittingOrderBtn: 'ĐANG XỬ LÝ ĐƠN HÀNG...',
      successModalTitle: 'Đặt Hàng Thành Công!',
      successModalIntro: 'Cảm ơn bạn đã đặt mua tại La Sơn Coffee Roastery!',
      orderCodeLabel: 'Mã đơn:',
      customerLabel: 'Khách hàng:',
      deliveryLabel: 'Hình thức:',
      pickupAddressLabel: 'Địa chỉ/Điểm nhận:',
      successModalFooter:
        'Dr. Thắng sẽ liên hệ qua Zalo/SĐT để xác nhận mẻ rang mới nhất cho bạn!',
      doneBtn: 'Hoàn tất',
    },
    admin: {
      headerTitle: 'La Sơn Coffee Roastery — Quản Trị Cửa Hàng & Xưởng Rang',
      viewStorefrontBtn: 'Xem Trang Khách Hàng',
      navOverview: 'Tổng Quan Cửa Hàng',
      navOrders: 'Đơn Hàng Guest Checkout',
      navProducts: 'Sản Phẩm & Menu',
      navSchedule: 'Lịch & Bản Đồ Xe Lưu Động',
      navContacts: 'Lời Nhắn Khách Hàng',
    },
  },

  en: {
    brand: {
      subtitle: 'La Son Coffee Roastery • Son La, Vietnam',
      footerTagline: 'Sip with a smile, sleep with a dream • Veterinarian Coffee Roaster in Son La',
      footerAddress: '📍 216 Hoang Quoc Viet, Van Son Ward, Son La | 📞 0386 423 993 | ✉️ lasonroastery@gmail.com',
    },
    announcement: {
      saturdayPrefix: 'Sat:',
      sundayPrefix: 'Sun:',
    },
    nav: {
      storyDesktop: '1. Our Story',
      storyMobile: '1. Story',
      beansDesktop: '2. Son La Coffee Beans',
      beansMobile: '2. Beans',
      drinksDesktop: '3. Cafe & Truck Menu',
      drinksMobile: '3. Drinks',
      gearMapDesktop: '4. Brewing Gear & Truck Map',
      gearMapMobile: '4. Gear & Map',
      cartButton: 'Cart',
    },
    storyPage: {
      heroBadge: '🐾 Veterinarian Coffee Roaster • Moc Chau, Son La',
      heroTitlePrefix: 'From Love for Animals to a',
      heroTitleHighlight: '“Healing” Cup of Coffee',
      heroDesc:
        'A Coffee - Tea - Milk journey of a Son La native. Bringing the scientific precision of a veterinarian and pure affection for four-legged friends into every batch of Northwest Vietnam Specialty Arabica.',
      heroQuote:
        '“Sip with a smile, sleep with a dream — Welcome to the coffee world of Dr. Thang!”',
      ctaBeans: 'Explore Our Trio: Ly • Kao • Bu →',
      ctaMap: '🚐 Weekend Coffee Truck Map',
      cardAddress: '216 Hoang Quoc Viet, Van Son Ward, Son La',
      cardPoint1Title: 'Scientific mindset from the clinic:',
      cardPoint1Body:
        'Monitoring every temperature curve and adjusting every second in the roasting drum with the care of nurturing a tiny life.',
      cardPoint2Title: 'Inspired by beloved pets:',
      cardPoint2Body:
        'Each coffee bag is named after a furry companion — from pure & bright Ly, sweet puppy Kao, to proud cat Bu.',
      scheduleBoxTitle: '📍 This Week’s Coffee Spots',
      scheduleShopLabel: '🏠 Roastery Cafe (Mon - Sun):',
      scheduleShopVal: '216 Hoang Quoc Viet, Van Son',
      scheduleSatLabel: '🚐 Saturday (06:30 - 11:30):',
      scheduleSatVal: 'Ban Ang Pine Forest',
      scheduleSunLabel: '🚐 Sunday (06:30 - 11:30):',
      scheduleSunVal: 'Moc Chau Heart Tea Hill',
      brandStoryEyebrow: 'Brand Story',
      brandStoryTitle: 'When the Veterinarian Steps Into the Roastery',
      brandStoryP1:
        'People mostly know me as a veterinarian — spending every day caring for, healing, and listening to the unspoken language of four-legged companions. That calling taught me patience, empathy, and deep compassion for every living being.',
      brandStoryP2:
        'Through years in veterinary medicine, my morning cup of coffee was more than an energy boost before tense surgeries — it became a comforting companion for the soul. From that passion, La Son Coffee Roastery was born in Moc Chau, Son La.',
      pillar1Title: '1. Roasted with clinical precision',
      pillar1Desc:
        'Approaching Son La green Arabica beans with scientific discipline, controlling roast profiles to unlock floral aromatics and natural sweetness.',
      pillar2Title: '2. Coffee of connection & healing',
      pillar2Desc:
        'Three classic processing methods (Washed, Honey, Natural) personified by three beloved pets: Ly Coffee, Kao Coffee, and Bu Coffee.',
      pillar3Title: '3. Cozy Roastery & Weekend Coffee Truck',
      pillar3Desc:
        'Beyond our space at 216 Hoang Quoc Viet, every weekend our mobile coffee truck travels to cloud-hunting peaks and pine forests to brew hot coffee in nature.',
      processEyebrow: '100% Specialty Son La Arabica',
      processTitle: '3 Processing Methods — 3 Bean Personalities',
      processSubtitle:
        'From the same ripe red coffee cherries grown on Son La hillsides, each processing craft unlocks a distinct spectrum of flavor.',
    },
    beansPage: {
      eyebrow: 'La Son Roastery • 100% Son La Arabica',
      title: 'Specialty Whole Bean & Freshly Ground Coffee',
      subtitle:
        'Choose Whole Bean or complimentary custom grind for your brewer. Fast guest checkout — no account required.',
      promoBold: 'Weekend Perk:',
      promoText: 'Pick up your order at our Weekend Coffee Truck & get 1 freshly brewed cup on the house!',
      weightLabel: 'Bag Weight',
      grindLabel: 'Grind Size',
      bagPrefix: 'Bag',
      addToCartBtn: '+ Add to Cart',
    },
    drinksPage: {
      badge: '☕ IN-PERSON EXPERIENCE MENU (DINE-IN & TRUCK ONLY)',
      title: 'Savor Freshly Brewed Coffee at Our Roastery & Mobile Truck',
      subtitle:
        'To preserve the delicate crema and floral aroma of Son La Arabica, handcrafted drinks are served exclusively at our Roastery (216 Hoang Quoc Viet) and Weekend Mobile Coffee Truck.',
      filterAll: 'All Drinks',
      filterTruck: '🚐 Available on Coffee Truck',
      filterShop: '🏠 Roastery Exclusive',
      baseBeanPrefix: 'Base Bean:',
      viewMapBtn: '📍 View Roastery & Truck Locations',
    },
    gearMapPage: {
      mapEyebrow: 'Interactive Map • Moc Chau - Son La',
      mapTitle: 'Where Is the La Son Coffee Truck This Weekend?',
      mapSubtitle:
        'Click any location below to view its exact coordinates on the map and opening hours.',
      gearEyebrow: 'Home Brewing Equipment (Available Online)',
      gearTitle: 'Manual Coffee Brewing Gear',
      gearSubtitle:
        'Handpicked by Dr. Thang so you can effortlessly brew Ly, Kao, and Bu Coffee at home.',
      buyGearBtn: '+ Add to Cart',
      contactEyebrow: 'Connect With La Son Coffee Roastery',
      contactTitle: 'Store & Roastery Contact',
      contactDesc:
        'Interested in Son La Specialty Coffee, wholesale beans for your cafe, or our weekend truck schedule? Reach out directly to Dr. Thang:',
      addressLabel: 'Roastery & Cafe Address:',
      addressValue: '216 Hoang Quoc Viet, Van Son Ward, Son La Province',
      hotlineLabel: 'Hotline / Zalo Order:',
      formTitle: 'Send a Message / Book a Coffee Session with Dr. Thang',
      namePlaceholder: 'Your Full Name *',
      phonePlaceholder: 'Phone Number / Zalo *',
      msgPlaceholder:
        'Your message (Wholesale inquiry, bean consultation, weekend truck location...)',
      submitBtn: 'Send Message',
      submittingBtn: 'Sending...',
      contactSuccessToast:
        'Thank you for messaging La Son Coffee Roastery! Dr. Thang will reply via Phone/Zalo shortly.',
    },
    cart: {
      drawerTitle: 'Your Cart & Fast Guest Checkout',
      drawerSubtitle: 'No login required • Order confirmed via Phone/Zalo',
      emptyCart: 'Your cart is empty. Pick a bag of Ly, Kao, or Bu Coffee to get started!',
      emptyOrderError:
        'Please add at least 1 coffee bag or brewing gear item before placing an order!',
      recipientSectionTitle: 'Recipient Information',
      fullNameLabel: 'Full Name *',
      fullNamePlaceholder: 'John Doe',
      phoneLabel: 'Phone Number / Zalo *',
      phonePlaceholder: '09xx xxx xxx',
      deliveryModeLabel: 'Delivery Method *',
      deliveryCodLabel: '🚚 Nationwide Home Delivery (COD)',
      deliveryPickupLabel: '🚐 Pick up at Roastery / Truck (+1 Free Coffee)',
      addressLabel: 'Shipping Address or Truck Pickup Spot *',
      addressPlaceholder: 'Street address, city (or e.g. Saturday pickup at Ban Ang Pine Forest)',
      noteLabel: 'Note for Dr. Thang',
      notePlaceholder: 'E.g. Please advise on V60 brewing ratio...',
      subTotalLabel: 'Subtotal:',
      shippingFeeLabel: 'Shipping Fee:',
      freeShipping: 'Free',
      grandTotalLabel: 'Total Payment:',
      submitOrderBtn: 'CONFIRM GUEST ORDER (NO LOGIN NEEDED)',
      submittingOrderBtn: 'PROCESSING ORDER...',
      successModalTitle: 'Order Placed Successfully!',
      successModalIntro: 'Thank you for ordering from La Son Coffee Roastery!',
      orderCodeLabel: 'Order Code:',
      customerLabel: 'Customer:',
      deliveryLabel: 'Delivery:',
      pickupAddressLabel: 'Address / Spot:',
      successModalFooter:
        'Dr. Thang will contact you via Zalo/Phone to confirm the freshest roast batch!',
      doneBtn: 'Done',
    },
    admin: {
      headerTitle: 'La Son Coffee Roastery — Store & Roastery Admin',
      viewStorefrontBtn: 'View Customer Storefront',
      navOverview: 'Store Overview',
      navOrders: 'Guest Checkout Orders',
      navProducts: 'Products & Menu',
      navSchedule: 'Truck Schedule & Map',
      navContacts: 'Customer Messages',
    },
  },
} as const;

export const GRIND_LABELS_EN: Record<GrindOption, string> = {
  'Nguyên hạt': 'Whole Bean',
  'Xay Pour Over / V60': 'Ground for Pour Over / V60',
  'Xay Pha Phin': 'Ground for Vietnamese Phin',
  'Xay Máy Espresso': 'Ground for Espresso Machine',
  'Xay Cold Brew': 'Coarse Ground for Cold Brew',
};

export function localizeAnnouncement(
  ann: WeekendAnnouncement,
  lang: SupportedLanguage,
): WeekendAnnouncement {
  if (lang === 'vi') return ann;
  return {
    ...ann,
    badgeText: '🚐 LASON COFFEE TRUCK THIS WEEKEND',
    saturdaySchedule:
      ann.saturdaySchedule === 'Đồi Thông Bản Áng (6h30 - 11h30)'
        ? 'Ban Ang Pine Forest (06:30 - 11:30)'
        : ann.saturdaySchedule,
    sundaySchedule:
      ann.sundaySchedule === 'Đồi Chè Trái Tim Mộc Châu (6h30 - 11h30)'
        ? 'Moc Chau Heart Tea Hill (06:30 - 11:30)'
        : ann.sundaySchedule,
    ctaLabel: 'View Map Coordinates →',
  };
}

export function localizeProcessMethods(
  list: ProcessMethodStory[],
  lang: SupportedLanguage,
): ProcessMethodStory[] {
  if (lang === 'vi') return list;
  const enMap: Record<string, Partial<ProcessMethodStory>> = {
    washed: {
      stepBadge: '1. Fully Washed Process',
      representativeName: 'Featured: LY COFFEE',
      description:
        'Pulped immediately after harvest, fermented to remove mucilage, washed with mountain spring water, and sun-dried. Delivers high clarity, bright acidity, and delicate white floral notes.',
      ctaText: 'Order Ly Coffee Beans →',
    },
    honey: {
      stepBadge: '2. Honey Process',
      representativeName: 'Featured: KAO COFFEE',
      description:
        'Inspired by gentle puppy Kao. De-pulped while retaining natural sweet pectin mucilage during raised-bed drying. Produces caramel-like sweetness and balanced fruity acidity.',
      ctaText: 'Order Kao Coffee Beans →',
    },
    natural: {
      stepBadge: '3. Natural Dry Process',
      representativeName: 'Featured: BU COFFEE',
      description:
        'Bold and regal like cat Bu. Whole ripe coffee cherries sun-dried under Northwest skies for 25–30 days. Preserves a syrupy body, deep sweetness, and ripe tropical fruit notes.',
      ctaText: 'Order Bu Coffee Beans →',
    },
  };
  return list.map((item) => ({ ...item, ...(enMap[item.id] || {}) }));
}

export function localizeBeans(beans: BeanProduct[], lang: SupportedLanguage): BeanProduct[] {
  if (lang === 'vi') return beans;
  const enMap: Record<string, Partial<BeanProduct>> = {
    'ly-coffee': {
      name: 'LY COFFEE — Son La Washed Arabica',
      badge: '1. Washed Process',
      roast: 'Light Roast',
      origin: '100% Son La Specialty Arabica',
      story:
        'Fully washed process yields the cleanest cup profile, sparkling acidity, and pure white floral notes of the Northwest highlands. Ideal for Pour Over, modern Espresso, and Cold Brew.',
      notes: ['White Floral', 'Bright Citrus Acidity', 'Clean Sweet Finish'],
    },
    'kao-coffee': {
      name: 'KAO COFFEE — Son La Honey Arabica',
      badge: '2. Honey Process',
      roast: 'Light Roast',
      origin: '100% Son La Specialty Arabica',
      story:
        'Inspired by the gentle nature of puppy Kao. Retains natural sweet pectin during raised-bed drying, bringing smooth caramel sweetness balanced with wildflower and fresh fruit.',
      notes: ['Sweet Caramel', 'Wildflower', 'Fresh Stone Fruit'],
    },
    'bu-coffee': {
      name: 'BU COFFEE — Son La Natural Arabica',
      badge: '3. Natural Process',
      roast: 'Light / Light+ Roast',
      origin: '100% Son La Specialty Arabica',
      story:
        'Carrying the regal charm of cat Bu. Whole ripe cherries sun-dried for 25–30 days, locking in a full syrupy body, intense sweetness, and vibrant tropical fruit aromatics.',
      notes: ['Ripe Tropical Fruit', 'Syrupy Body', 'Deep Sweetness'],
    },
    'lason-phin-blend': {
      name: 'LA SON BLEND — Northwest Phin & Iced Milk Coffee',
      badge: 'Traditional & Specialty Blend',
      roast: 'Medium Roast',
      origin: 'Son La Arabica & Fine Robusta',
      story:
        'A harmonious marriage of aromatic Son La Arabica and rich, chocolatey Fine Robusta — crafted specifically for Vietnamese Phin filter and bold morning iced milk coffee.',
      notes: ['Dark Chocolate', 'Roasted Hazelnut', 'Bold Sweet Aftertaste'],
    },
  };
  return beans.map((b) => ({ ...b, ...(enMap[b.id] || {}) }));
}

export function localizeDrinks(drinks: DrinkItem[], lang: SupportedLanguage): DrinkItem[] {
  if (lang === 'vi') return drinks;
  const enMap: Record<string, Partial<DrinkItem>> = {
    'drink-v60': {
      name: 'V60 Pour Over — Ly / Kao / Bu Beans',
      badgeText: '🚐 Roastery & Mobile Truck',
      baseBean: 'Choice of Ly (Washed), Kao (Honey), or Bu (Natural)',
      desc: 'Hand-poured through paper filter to highlight delicate floral aromatics, bright fruit acidity, and lingering sweetness of Son La Arabica.',
    },
    'drink-coldbrew': {
      name: '18-Hour Slow Steeped Son La Cold Brew',
      badgeText: '🚐 Roastery & Mobile Truck',
      baseBean: 'Bu Coffee (Natural) ripe fruit base',
      desc: 'Cold-steeped for 18 hours using natural-processed Bu Coffee beans for a refreshing, berry-infused specialty brew.',
    },
    'drink-milk-coffee': {
      name: 'Moc Chau Fresh Milk Coffee (“Sip & Smile”)',
      badgeText: '🚐 Roastery & Mobile Truck',
      baseBean: 'Kao Coffee Espresso & Moc Chau Fresh Milk',
      desc: 'A sweet harmony between Honey-processed Son La Arabica espresso and creamy farm-fresh milk from the Moc Chau plateau.',
    },
    'drink-oolong-milk': {
      name: 'Highland Oolong Milk Tea',
      badgeText: '🚐 Roastery & Mobile Truck',
      baseBean: 'Slow-brewed Moc Chau Oolong Tea',
      desc: 'Part of La Son’s “Coffee - Tea - Milk” craft: brisk highland Oolong tea mellowed with velvety fresh milk.',
    },
    'drink-tasting-flight': {
      name: '3-Process Tasting Flight Combo',
      badgeText: '🏠 Exclusive at 216 Hoang Quoc Viet Roastery',
      baseBean: 'Trio flight: Ly (Washed) + Kao (Honey) + Bu (Natural)',
      desc: 'Compare all 3 Son La coffee processing methods side by side with live sensory storytelling from Dr. Thang at the bar.',
    },
    'drink-espresso-tonic': {
      name: 'Northwest Red Plum Espresso Tonic',
      badgeText: '🏠 Exclusive at 216 Hoang Quoc Viet Roastery',
      baseBean: 'Double Shot Ly Coffee + Moc Chau Plum Syrup',
      desc: 'Crisp tartness of ripe Moc Chau red plums topped with bright Arabica espresso crema for an energizing cup.',
    },
  };
  return drinks.map((d) => ({ ...d, ...(enMap[d.id] || {}) }));
}

export function localizeGear(gear: GearProduct[], lang: SupportedLanguage): GearProduct[] {
  if (lang === 'vi') return gear;
  const enMap: Record<string, Partial<GearProduct>> = {
    'gear-v60': {
      name: 'Ceramic V60 Dripper + Filter Papers (Size 02)',
      desc: 'The ideal brewer to unlock floral clarity in light-roasted Ly & Kao Coffee.',
    },
    'gear-kettle': {
      name: 'Gooseneck Pour-Over Kettle 600ml',
      desc: 'Matte stainless steel with precision spout for steady circular pouring.',
    },
    'gear-grinder': {
      name: 'CNC Steel Burr Manual Coffee Grinder',
      desc: '24 stepped grind settings from fine Espresso & Phin to V60 and Cold Brew.',
    },
    'gear-phin': {
      name: "Anodized Aluminum Phin Filter (Engraved Ls')",
      desc: 'Even heat retention for rich Vietnamese drip extraction without metallic taste.',
    },
  };
  return gear.map((g) => ({ ...g, ...(enMap[g.id] || {}) }));
}

export function localizeMapSpots(
  spots: MapSpotLocation[],
  lang: SupportedLanguage,
): MapSpotLocation[] {
  if (lang === 'vi') return spots;
  const enMap: Record<string, Partial<MapSpotLocation>> = {
    'spot-roastery': {
      title: '🏠 La Son Flagship Cafe & Roastery',
      shortLabel: '🏠 Flagship Roastery (Van Son)',
      time: 'Mon – Sun (07:00 – 21:30)',
      address: '216 Hoang Quoc Viet, Van Son Ward, Moc Chau, Son La',
      note: 'Full Ly - Kao - Bu tasting bar & roasting lab with Dr. Thang.',
    },
    'spot-saturday-truck': {
      title: '🚐 Mobile Coffee Truck — Saturday Morning',
      shortLabel: '🚐 Sat: Ban Ang Pine Forest',
      time: 'This Saturday (06:30 – 11:30)',
      address: 'Main Gate, Ban Ang Pine Forest, Dong Sang, Moc Chau, Son La',
      note: 'Camping chairs under the pine trees, serving hot Pour Over & Cold Brew.',
    },
    'spot-sunday-truck': {
      title: '🚐 Mobile Coffee Truck — Sunday Morning',
      shortLabel: '🚐 Sun: Heart Tea Hill',
      time: 'This Sunday (06:30 – 11:30)',
      address: 'Heart Tea Hill (Nong Truong Town), Moc Chau, Son La',
      note: 'Morning mist viewpoint serving hot Moc Chau Fresh Milk Coffee.',
    },
  };
  return spots.map((s) => ({ ...s, ...(enMap[s.id] || {}) }));
}

