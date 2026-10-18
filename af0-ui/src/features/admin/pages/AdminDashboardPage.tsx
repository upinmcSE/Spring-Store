import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  PendingActions as PendingActionsIcon,
  LocalCafeOutlined as LocalCafeOutlinedIcon,
  MarkChatUnreadOutlined as MarkChatUnreadOutlinedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { DashboardSummary } from '../../../types/auth.types';
import type { OrderRecord, OrderStatus } from '../../../types/order.types';
import { dashboardApi } from '../../../services/api/dashboard.api';
import { orderApi } from '../../../services/api/order.api';
import { getAdminBasePath } from '../../../services/api/httpClient';
import { formatDateTimeVN, formatVND } from '../../../utils/formatters';
import { LASON_COLORS, LASON_FONTS } from '../../../theme';

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: 'warning' | 'info' | 'secondary' | 'primary' | 'success' | 'error' }
> = {
  PENDING: { label: 'Chờ xác nhận Zalo', color: 'warning' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'info' },
  ROASTING: { label: 'Đang rang / Đóng gói', color: 'secondary' },
  SHIPPING: { label: 'Đang giao / Chờ nhận tại Xe', color: 'primary' },
  COMPLETED: { label: 'Hoàn thành', color: 'success' },
  CANCELLED: { label: 'Đã hủy', color: 'error' },
};

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const adminBase = getAdminBasePath();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    dashboardApi.getSummary().then(setSummary);
    orderApi.getOrdersAdmin().then((list) => setRecentOrders(list.slice(0, 5)));
  }, []);

  const kpiCards = [
    {
      title: 'Tổng Doanh Thu (Đơn hợp lệ)',
      value: summary ? formatVND(summary.totalRevenue) : '0đ',
      subtitle: `${summary?.totalOrders || 0} đơn đặt hàng trên hệ thống`,
      icon: <TrendingUpIcon />,
      accent: LASON_COLORS.brown,
    },
    {
      title: 'Đơn Mới Chờ Xác Nhận Zalo',
      value: String(summary?.pendingOrdersCount ?? 0),
      subtitle: 'Cần gọi/nhắn Zalo xác nhận mẻ rang',
      icon: <PendingActionsIcon />,
      accent: LASON_COLORS.gold,
    },
    {
      title: 'Sản Phẩm Đang Mở Bán',
      value: `${(summary?.activeBeanProducts ?? 0) + (summary?.activeGearProducts ?? 0)} SP`,
      subtitle: `${summary?.activeBeanProducts ?? 0} dòng hạt rang • ${summary?.activeGearProducts ?? 0} thiết bị`,
      icon: <LocalCafeOutlinedIcon />,
      accent: LASON_COLORS.green,
    },
    {
      title: 'Lời Nhắn Khách Chưa Đọc',
      value: String(summary?.unreadContactsCount ?? 0),
      subtitle: 'Khách hỏi sỉ / lịch xe lưu động',
      icon: <MarkChatUnreadOutlinedIcon />,
      accent: '#0284C7',
    },
  ];

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{ fontFamily: LASON_FONTS.serif, fontSize: { xs: '1.5rem', sm: '1.85rem' } }}
          >
            Bảng Điều Khiển Cửa Hàng La Sơn
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: LASON_COLORS.stoneMuted }}>
            Theo dõi đơn đặt hạt cà phê, tồn kho xưởng rang và lịch trình Xe Lưu Động cuối tuần.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            onClick={() => navigate(`${adminBase}/schedule`)}
            sx={{ borderColor: LASON_COLORS.brown, color: LASON_COLORS.brown }}
          >
            🚐 Cập Nhật Lịch Xe Tuần Này
          </Button>
          <Button variant="contained" onClick={() => navigate(`${adminBase}/orders`)}>
            Quản Lý Đơn Hàng →
          </Button>
        </Stack>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2.5}>
        {kpiCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.title}>
            <Card sx={{ p: 2.5, borderRadius: '20px', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: LASON_COLORS.stoneMuted }}>
                  {card.title}
                </Typography>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    bgcolor: `${card.accent}18`,
                    color: card.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {card.icon}
                </Box>
              </Box>
              <Typography
                sx={{
                  fontFamily: LASON_FONTS.serif,
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: LASON_COLORS.dark,
                }}
              >
                {card.value}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: LASON_COLORS.stoneMuted, mt: 0.5 }}>
                {card.subtitle}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Orders Table */}
      <Paper sx={{ p: 3, borderRadius: '20px', border: `1px solid ${LASON_COLORS.stoneBorder}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontFamily: LASON_FONTS.serif, fontSize: '1.2rem', fontWeight: 700 }}>
            Đơn Đặt Hàng Gần Nhất
          </Typography>
          <Button size="small" onClick={() => navigate(`${adminBase}/orders`)}>
            Xem tất cả →
          </Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Mã Đơn</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Khách Hàng / Zalo</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Hình Thức Nhận</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tổng Tiền</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Trạng Thái</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Thời Gian</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((ord) => {
                const st = ORDER_STATUS_CONFIG[ord.status];
                return (
                  <TableRow key={ord.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: LASON_COLORS.brown }}>
                      {ord.orderCode}
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        {ord.customerName}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: LASON_COLORS.stoneMuted }}>
                        📞 {ord.customerPhone}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.8rem' }}>{ord.deliveryMode}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{formatVND(ord.grandTotal)}</TableCell>
                    <TableCell>
                      <Chip label={st.label} color={st.color} size="small" />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75rem', color: LASON_COLORS.stoneMuted }}>
                      {formatDateTimeVN(ord.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
};
