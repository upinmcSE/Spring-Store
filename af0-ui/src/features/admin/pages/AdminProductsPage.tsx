import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  EditOutlined as EditOutlinedIcon,
} from '@mui/icons-material';
import type { BeanProduct, DrinkItem, GearProduct } from '../../../types/product.types';
import { productApi } from '../../../services/api/product.api';
import { formatVND } from '../../../utils/formatters';
import { LASON_COLORS, LASON_FONTS } from '../../../theme';

export const AdminProductsPage: React.FC = () => {
  const [tab, setTab] = useState<'beans' | 'drinks' | 'gear'>('beans');
  const [beans, setBeans] = useState<BeanProduct[]>([]);
  const [drinks, setDrinks] = useState<DrinkItem[]>([]);
  const [gear, setGear] = useState<GearProduct[]>([]);
  const [editingBean, setEditingBean] = useState<BeanProduct | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadAll = () => {
    productApi.getAllBeansAdmin().then(setBeans);
    productApi.getAllDrinksAdmin().then(setDrinks);
    productApi.getAllGearAdmin().then(setGear);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleToggleBeanStock = async (bean: BeanProduct) => {
    await productApi.saveBeanAdmin({ ...bean, inStock: bean.inStock === false });
    loadAll();
    setToastMsg(`Đã cập nhật trạng thái hiển thị của ${bean.name}`);
  };

  const handleToggleDrinkActive = async (drink: DrinkItem) => {
    await productApi.saveDrinkAdmin({ ...drink, active: drink.active === false });
    loadAll();
    setToastMsg(`Đã cập nhật trạng thái món ${drink.name}`);
  };

  const handleToggleGearStock = async (item: GearProduct) => {
    await productApi.saveGearAdmin({ ...item, inStock: item.inStock === false });
    loadAll();
    setToastMsg(`Đã cập nhật trạng thái ${item.name}`);
  };

  const handleSaveBeanDialog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBean) return;
    await productApi.saveBeanAdmin(editingBean);
    setEditingBean(null);
    loadAll();
    setToastMsg('Đã lưu thông tin gói cà phê hạt thành công!');
  };

  const handleOpenNewBean = () => {
    setEditingBean({
      id: `bean-${Date.now()}`,
      name: 'MẺ RANG MỚI — Arabica Sơn La',
      badge: 'Mẻ rang đặc biệt',
      roast: 'Light / Medium Roast',
      origin: '100% Arabica Sơn La',
      price250: 160000,
      price500: 300000,
      story: 'Mẻ rang thủ công mới ra lò từ xưởng rang La Sơn Coffee Roastery.',
      notes: ['Hương hoa', 'Hậu ngọt'],
      image:
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      inStock: true,
    });
  };

  return (
    <Stack spacing={3}>
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
            Quản Lý Sản Phẩm &amp; Thực Đơn
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: LASON_COLORS.stoneMuted }}>
            Cập nhật giá bán, câu chuyện hạt và bật/tắt hiển thị trực tiếp trên trang Khách Hàng.
          </Typography>
        </Box>

        {tab === 'beans' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenNewBean}
          >
            Thêm Dòng Hạt Rang Mới
          </Button>
        )}
      </Box>

      <Paper sx={{ borderRadius: '20px', border: `1px solid ${LASON_COLORS.stoneBorder}`, overflow: 'hidden' }}>
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          sx={{ borderBottom: `1px solid ${LASON_COLORS.stoneBorder}`, px: 2, bgcolor: '#FAFAF9' }}
        >
          <Tab value="beans" label={`Hạt Cà Phê Rang (${beans.length})`} sx={{ fontWeight: 700 }} />
          <Tab value="drinks" label={`Menu Đồ Uống (${drinks.length})`} sx={{ fontWeight: 700 }} />
          <Tab value="gear" label={`Thiết Bị Pha Chế (${gear.length})`} sx={{ fontWeight: 700 }} />
        </Tabs>

        {tab === 'beans' && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Sản Phẩm Hạt</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Mức Rang / Sơ Chế</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Giá Túi 250g</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Giá Túi 500g</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Mở Bán</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    Chỉnh Sửa
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beans.map((b) => (
                  <TableRow key={b.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                        {b.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: LASON_COLORS.stoneMuted }}>
                        Notes: {b.notes.join(' • ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={b.badge} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                      <Typography sx={{ fontSize: '0.75rem', color: LASON_COLORS.stoneMuted }}>
                        {b.roast}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: LASON_COLORS.brown }}>
                      {formatVND(b.price250)}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: LASON_COLORS.brown }}>
                      {formatVND(b.price500)}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={b.inStock !== false}
                        onChange={() => handleToggleBeanStock(b)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditOutlinedIcon fontSize="small" />}
                        onClick={() => setEditingBean(b)}
                      >
                        Sửa giá / Nội dung
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 'drinks' && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Tên Đồ Uống</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Hạt Nền</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Điểm Phục Vụ</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Giá Niêm Yết</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Hiển Thị Menu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drinks.map((d) => (
                  <TableRow key={d.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{d.name}</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem' }}>{d.baseBean}</TableCell>
                    <TableCell>
                      <Chip
                        label={d.badgeText}
                        size="small"
                        color={d.availableAt === 'truck' ? 'warning' : 'default'}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: LASON_COLORS.brown }}>
                      {d.priceLabel}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={d.active !== false}
                        onChange={() => handleToggleDrinkActive(d)}
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 'gear' && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Tên Thiết Bị</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Mô Tả</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Giá Bán</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Còn Hàng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gear.map((g) => (
                  <TableRow key={g.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{g.name}</TableCell>
                    <TableCell sx={{ fontSize: '0.8rem', color: LASON_COLORS.stoneMuted }}>
                      {g.desc}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: LASON_COLORS.brown }}>
                      {formatVND(g.price)}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={g.inStock !== false}
                        onChange={() => handleToggleGearStock(g)}
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Edit Bean Modal */}
      <Dialog
        open={Boolean(editingBean)}
        onClose={() => setEditingBean(null)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4 } } }}
      >
        {editingBean && (
          <Box component="form" onSubmit={handleSaveBeanDialog}>
            <DialogTitle sx={{ fontFamily: LASON_FONTS.serif, fontWeight: 700 }}>
              Cập Nhật Sản Phẩm Hạt Rang
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2}>
                <TextField
                  label="Tên gói cà phê *"
                  fullWidth
                  required
                  size="small"
                  value={editingBean.name}
                  onChange={(e) => setEditingBean({ ...editingBean, name: e.target.value })}
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Nhãn phương pháp sơ chế *"
                      fullWidth
                      required
                      size="small"
                      value={editingBean.badge}
                      onChange={(e) => setEditingBean({ ...editingBean, badge: e.target.value })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Mức rang *"
                      fullWidth
                      required
                      size="small"
                      value={editingBean.roast}
                      onChange={(e) => setEditingBean({ ...editingBean, roast: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Giá túi 250g (VNĐ) *"
                      type="number"
                      fullWidth
                      required
                      size="small"
                      value={editingBean.price250}
                      onChange={(e) =>
                        setEditingBean({ ...editingBean, price250: Number(e.target.value) })
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Giá túi 500g (VNĐ) *"
                      type="number"
                      fullWidth
                      required
                      size="small"
                      value={editingBean.price500}
                      onChange={(e) =>
                        setEditingBean({ ...editingBean, price500: Number(e.target.value) })
                      }
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Câu chuyện hương vị *"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  size="small"
                  value={editingBean.story}
                  onChange={(e) => setEditingBean({ ...editingBean, story: e.target.value })}
                />

                <TextField
                  label="Nốt hương (phân cách bằng dấu phẩy)"
                  fullWidth
                  size="small"
                  value={editingBean.notes.join(', ')}
                  onChange={(e) =>
                    setEditingBean({
                      ...editingBean,
                      notes: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setEditingBean(null)}>Hủy</Button>
              <Button type="submit" variant="contained">
                Lưu Thay Đổi
              </Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>

      <Snackbar
        open={Boolean(toastMsg)}
        autoHideDuration={3500}
        onClose={() => setToastMsg(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToastMsg(null)}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
