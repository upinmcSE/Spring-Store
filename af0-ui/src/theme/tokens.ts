/**
 * Global Design Tokens — La Sơn Coffee Roastery
 * Định nghĩa tập trung toàn bộ màu sắc, font chữ, bo góc và độ đổ bóng toàn cục.
 */

export const LASON_COLORS = {
  brown: '#8D532B', // Màu nền chuẩn từ Logo Ls' (Primary)
  brownHover: '#734220',
  dark: '#3D2314', // Nâu Espresso đậm (Text chính / Nền tối)
  cream: '#FAF6F0', // Kem giấy mộc (Background chính)
  sand: '#EFE6D8', // Màu túi Kraft (Section phụ / Card)
  gold: '#D97706', // Điểm nhấn Honey (Secondary / Accent)
  goldLight: '#FEF3C7', // Nền kem vàng nhạt
  green: '#2D5A27', // Xanh núi rừng Tây Bắc (Success)
  stoneBorder: '#E7E5E4', // Viền stone-200
  stoneMuted: '#78716C', // Chữ phụ stone-500/600
  white: '#FFFFFF',
} as const;

export const LASON_FONTS = {
  // Tiêu đề báo chí tinh tế, giàu cảm xúc thủ công (thay cho Playfair Display)
  serif: '"Newsreader", Georgia, serif',
  // Nội dung & giao diện tối ưu riêng cho tiếng Việt, gọn gàng hiện đại
  sans: '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  // Thông số kỹ thuật xưởng rang: khối lượng (250g/500g), độ rang, giá tiền, mã đơn
  mono: '"JetBrains Mono", monospace',
} as const;

export const LASON_LAYOUT = {
  maxWidth: 1280,
  headerHeight: 80,
  borderRadiusSm: 10,
  borderRadiusMd: 14,
  borderRadiusLg: 20,
} as const;
