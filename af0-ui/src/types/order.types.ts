export type DeliveryMode =
  | 'Giao tận nhà (COD toàn quốc)'
  | 'Nhận tại Quán / Xe Lưu Động Cuối Tuần';

export interface CartItem {
  key: string;
  productId: string;
  productType: 'bean' | 'gear';
  name: string;
  variant: string;
  price: number;
  qty: number;
}

export interface GuestOrderRequest {
  customerName: string;
  customerPhone: string;
  deliveryMode: DeliveryMode;
  deliveryAddress: string;
  note?: string;
  items: CartItem[];
  subTotal: number;
  shippingFee: number;
  grandTotal: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ROASTING'
  | 'SHIPPING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface OrderRecord extends GuestOrderRequest {
  id: string;
  orderCode: string;
  status: OrderStatus;
  createdAt: string;
}

export type ContactStatus = 'NEW' | 'CONTACTED' | 'RESOLVED';

export interface ContactRequest {
  fullName: string;
  phone: string;
  message: string;
}

export interface ContactRecord extends ContactRequest {
  id: string;
  status: ContactStatus;
  createdAt: string;
}

