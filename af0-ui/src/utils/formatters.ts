/**
 * Định dạng số tiền sang chuẩn VNĐ (ví dụ: 155.000đ)
 */
export function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}

/**
 * Định dạng thời gian hiển thị tiếng Việt
 */
export function formatDateTimeVN(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoDate;
  }
}

