import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, DeliveryMode } from '../types/order.types';
import type {
  BeanProduct,
  BeanWeight,
  GearProduct,
  GrindOption,
} from '../types/product.types';

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  deliveryMode: DeliveryMode;
  totalCount: number;
  subTotal: number;
  shippingFee: number;
  grandTotal: number;
  openCart: () => void;
  closeCart: () => void;
  setDeliveryMode: (mode: DeliveryMode) => void;
  addBeanToCart: (bean: BeanProduct, weight: BeanWeight, grind: GrindOption) => void;
  addGearToCart: (gear: GearProduct) => void;
  changeQty: (key: string, delta: number) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = 'lason_customer_cart_v1';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>(
    'Giao tận nhà (COD toàn quốc)',
  );

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addBeanToCart = (bean: BeanProduct, weight: BeanWeight, grind: GrindOption) => {
    const price = weight === '250g' ? bean.price250 : bean.price500;
    const key = `${bean.id}-${weight}-${grind}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          productId: bean.id,
          productType: 'bean',
          name: bean.name,
          variant: `${weight} • ${grind}`,
          price,
          qty: 1,
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const addGearToCart = (gear: GearProduct) => {
    const key = gear.id;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          productId: gear.id,
          productType: 'gear',
          name: gear.name,
          variant: 'Dụng cụ pha chế',
          price: gear.price,
          qty: 1,
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const changeQty = (key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const clearCart = () => setItems([]);

  const { totalCount, subTotal, shippingFee, grandTotal } = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const sub = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const isPickup = deliveryMode.includes('Nhận tại Quán');
    const ship = sub === 0 || isPickup || sub >= 500000 ? 0 : 25000;
    return {
      totalCount: count,
      subTotal: sub,
      shippingFee: ship,
      grandTotal: sub + ship,
    };
  }, [items, deliveryMode]);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        deliveryMode,
        totalCount,
        subTotal,
        shippingFee,
        grandTotal,
        openCart: () => setIsDrawerOpen(true),
        closeCart: () => setIsDrawerOpen(false),
        setDeliveryMode,
        addBeanToCart,
        addGearToCart,
        changeQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

