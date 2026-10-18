import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import type { OrderRecord, OrderStatus } from '../../../types/order.types';
import { orderApi } from '../../../services/api/order.api';
import { formatDateTimeVN, formatVND } from '../../../utils/formatters';
import { LASON_COLORS, LASON_FONTS } from '../../../theme';
import { ORDER_STATUS_CONFIG } from './AdminDashboardPage';

const STATUS_TABS: { value: 'ALL' | OrderStatus; label: string }[] = [
  { value: 'ALL', label: 'Tất cả đơn' },
  { value: 'PENDING', label: 'Chờ xác nhận' },
  { value: 'CONFIRMED', label: 'Đã xác nhận' },
  { value: 'ROASTING', label: 'Đang rang/gói' },
  { value: 'SHIPPING', label: 'Đang giao / Xe' },
  { value: 'COMPLETED', label: 'Hoàn thành' },
  { value: 'CANCELLED', label: 'Đã hủy' },
];

export const AdminOrdersPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | OrderStatus>('ALL');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  const loadOrders = () => {
    orderApi.getOrdersAdmin(statusFilter).then(setOrders);
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const updated = await orderApi.updateOrderStatusAdmin(orderId, newStatus);
    loadOrders();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(updated);
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography
          variant="h3"
          sx={{ fontFamily: LASON_FONTS.serif, fontSize: { xs: '1.5rem', sm: '1.85rem' } }}
        >
          Quản Lý Đơn Đặt Hàng (Guest Checkout)
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: LASON_COLORS.stoneMuted }}>
          Kiểm tra quy cách xay hạt (Nguyên hạt / V60 / Phin / Espresso), liên hệ Zalo khách và cập
          nhật trạng thái mẻ rang.
        </Typography>
      </Box>

      <Paper sx={{ borderRadius: '20px', border: `1px solid ${LASON_COLORS.stoneBorder}`, overflow: 'hidden' }}>
        <Tabs
          value={statusFilter}
          onChange={(_, val) => setStatusFilter(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: `1px solid ${LASON_COLORS.stoneBorder}`, px: 2, bgcolor: '#FAFAF9' }}
        >
          {STATUS_TABS.map((t) => (
            <Tab key={t.value} value={t.value} label={t.label} sx={{ fontWeight: 700, fontSize: '0.8rem' }} />
          ))}
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Mã Đơn</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Khách Hàng</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Sản Phẩm Đặt</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Hình Thức &amp; Địa Chỉ</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tổng Thanh Toán</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Trạng Thái Đơn</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Thao Tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5, color: LASON_COLORS.stoneMuted }}>
                    Không có đơn hàng nào trong trạng thái này.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((ord) => {
                  const st = ORDER_STATUS_CONFIG[ord.status];
                  return (
                    <TableRow key={ord.id} hover>
                      <TableCell>
                        <Typography sx={{ fontWeight: 700, color: LASON_COLORS.brown, fontSize: '0.85rem' }}>
                          {ord.orderCode}
                        </Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: LASON_COLORS.stoneMuted }}>
                          {formatDateTimeVN(ord.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                          {ord.customerName}
                        </Typography>
                        <Typography sx={{ fontSize: '0.78rem', color: LASON_COLORS.brown, fontWeight: 600 }}>
                          📞 {ord.customerPhone}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {ord.items.map((item) => (
                          <Typography key={item.key} sx={{ fontSize: '0.78rem' }}>
                            • <strong>{item.qty}x</strong> {item.name} ({item.variant})
                          </Typography>
                        ))}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 240 }}>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600 }}>
                          {ord.deliveryMode}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: LASON_COLORS.stoneMuted }}>
                          📍 {ord.deliveryAddress}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{formatVND(ord.grandTotal)}</TableCell>
                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 170 }}>
                          <Select
                            value={ord.status}
                            onChange={(e) =>
                              handleStatusChange(ord.id, e.target.value as OrderStatus)
                            }
                            sx={{ fontSize: '0.78rem', fontWeight: 600 }}
                          >
                            {Object.entries(ORDER_STATUS_CONFIG).map(([key, cfg]) => (
                              <MenuItem key={key} value={key} sx={{ fontSize: '0.78rem' }}>
                                {cfg.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <Box sx={{ mt: 0.5 }}>
                          <Chip label={st.label} color={st.color} size="small" />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => setSelectedOrder(ord)}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Order Detail Dialog */}
      <Dialog
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4 } } }}
      >
        {selectedOrder && (
          <>
            <DialogTitle sx={{ fontFamily: LASON_FONTS.serif, fontWeight: 700 }}>
              Chi Tiết Đơn Hàng #{selectedOrder.orderCode}
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2}>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem' }}>
                    <strong>Khách hàng:</strong> {selectedOrder.customerName} —{' '}
                    <strong>SĐT/Zalo:</strong> {selectedOrder.customerPhone}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', mt: 0.5 }}>
                    <strong>Hình thức nhận:</strong> {selectedOrder.deliveryMode}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', mt: 0.5 }}>
                    <strong>Địa chỉ / Điểm hẹn:</strong> {selectedOrder.deliveryAddress}
                  </Typography>
                  {selectedOrder.note && (
                    <Typography sx={{ fontSize: '0.85rem', mt: 0.5, color: LASON_COLORS.brown }}>
                      <strong>Ghi chú cho Dr. Thắng:</strong> {selectedOrder.note}
                    </Typography>
                  )}
                </Box>

                <Divider />

                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    Danh sách sản phẩm:
                  </Typography>
                  {selectedOrder.items.map((item) => (
                    <Box
                      key={item.key}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 1.25,
                        borderRadius: 2,
                        bgcolor: LASON_COLORS.cream,
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>
                          {item.qty}x {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: LASON_COLORS.stoneMuted }}>
                          Quy cách: {item.variant}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                        {formatVND(item.price * item.qty)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Tổng thanh toán:</span>
                  <span style={{ color: LASON_COLORS.brown }}>
                    {formatVND(selectedOrder.grandTotal)}
                  </span>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setSelectedOrder(null)} variant="contained">
                Đóng
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Stack>
  );
};
