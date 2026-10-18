import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  CheckCircleOutlined as CheckCircleOutlineIcon,
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import type { DeliveryMode, OrderRecord } from '../../types/order.types';
import { orderApi } from '../../services/api/order.api';
import { formatVND } from '../../utils/formatters';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    deliveryMode,
    subTotal,
    shippingFee,
    grandTotal,
    closeCart,
    setDeliveryMode,
    changeQty,
    clearCart,
  } = useCart();
  const { t } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg(t.cart.emptyOrderError);
      return;
    }

    setSubmitting(true);
    try {
      const order = await orderApi.placeGuestOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryMode,
        deliveryAddress: deliveryAddress.trim(),
        note: note.trim() || undefined,
        items,
        subTotal,
        shippingFee,
        grandTotal,
      });
      setCompletedOrder(order);
      clearCart();
      setCustomerName('');
      setCustomerPhone('');
      setDeliveryAddress('');
      setNote('');
      closeCart();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Order failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const deliveryOptions: { value: DeliveryMode; label: string; highlight?: boolean }[] = [
    {
      value: 'Giao tận nhà (COD toàn quốc)',
      label: t.cart.deliveryCodLabel,
    },
    {
      value: 'Nhận tại Quán / Xe Lưu Động Cuối Tuần',
      label: t.cart.deliveryPickupLabel,
      highlight: true,
    },
  ];

  return (
    <>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeCart}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              maxWidth: 512,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: LASON_COLORS.white,
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2.5,
            bgcolor: LASON_COLORS.brown,
            color: LASON_COLORS.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: LASON_FONTS.serif,
                fontSize: '1.25rem',
                fontWeight: 600,
              }}
            >
              {t.cart.drawerTitle}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#FEF3C7' }}>
              {t.cart.drawerSubtitle}
            </Typography>
          </Box>
          <IconButton
            onClick={closeCart}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: LASON_COLORS.white,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.28)' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Body */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
          {errorMsg && (
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setErrorMsg(null)}>
              {errorMsg}
            </Alert>
          )}

          {/* Cart Items List */}
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            {items.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 4,
                  color: '#A8A29E',
                  fontSize: '0.875rem',
                }}
              >
                {t.cart.emptyCart}
              </Box>
            ) : (
              items.map((item) => (
                <Box
                  key={item.key}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5,
                    p: 1.75,
                    borderRadius: '14px',
                    bgcolor: '#FAFAF9',
                    border: `1px solid ${LASON_COLORS.stoneBorder}`,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        color: LASON_COLORS.dark,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: LASON_FONTS.mono,
                        fontSize: '0.73rem',
                        color: LASON_COLORS.stoneMuted,
                      }}
                    >
                      {item.variant} —{' '}
                      <strong style={{ color: LASON_COLORS.brown }}>
                        {formatVND(item.price)}
                      </strong>
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => changeQty(item.key, -1)}
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '8px',
                        bgcolor: LASON_COLORS.white,
                        border: '1px solid #D6D3D1',
                      }}
                    >
                      <RemoveIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Typography
                      sx={{
                        fontFamily: LASON_FONTS.mono,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        minWidth: 20,
                        textAlign: 'center',
                      }}
                    >
                      {item.qty}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => changeQty(item.key, 1)}
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '8px',
                        bgcolor: LASON_COLORS.white,
                        border: '1px solid #D6D3D1',
                      }}
                    >
                      <AddIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Stack>

          <Divider sx={{ mb: 2.5 }} />

          {/* Checkout Form */}
          <Box component="form" onSubmit={handlePlaceOrder}>
            <Typography
              sx={{
                fontFamily: LASON_FONTS.serif,
                fontWeight: 600,
                fontSize: '1.05rem',
                color: LASON_COLORS.dark,
                mb: 2,
              }}
            >
              {t.cart.recipientSectionTitle}
            </Typography>

            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#57534E', mb: 0.5 }}>
                  {t.cart.fullNameLabel}
                </Typography>
                <TextField
                  fullWidth
                  required
                  size="small"
                  placeholder={t.cart.fullNamePlaceholder}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#57534E', mb: 0.5 }}>
                  {t.cart.phoneLabel}
                </Typography>
                <TextField
                  fullWidth
                  required
                  type="tel"
                  size="small"
                  placeholder={t.cart.phonePlaceholder}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#57534E', mb: 0.75 }}>
                {t.cart.deliveryModeLabel}
              </Typography>
              <Grid container spacing={1}>
                {deliveryOptions.map((opt) => {
                  const selected = deliveryMode === opt.value;
                  return (
                    <Grid size={{ xs: 12, sm: 6 }} key={opt.value}>
                      <Box
                        onClick={() => setDeliveryMode(opt.value)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.75,
                          p: 1.25,
                          borderRadius: '10px',
                          cursor: 'pointer',
                          border: selected
                            ? `1.5px solid ${LASON_COLORS.brown}`
                            : opt.highlight
                              ? '1px solid #FCD34D'
                              : `1px solid ${LASON_COLORS.stoneBorder}`,
                          bgcolor: opt.highlight ? '#FFFBEB' : '#FAFAF9',
                        }}
                      >
                        <Radio
                          size="small"
                          checked={selected}
                          sx={{ p: 0.25, color: LASON_COLORS.brown }}
                        />
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                          {opt.label}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#57534E', mb: 0.5 }}>
                {t.cart.addressLabel}
              </Typography>
              <TextField
                fullWidth
                required
                size="small"
                placeholder={t.cart.addressPlaceholder}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#57534E', mb: 0.5 }}>
                {t.cart.noteLabel}
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder={t.cart.notePlaceholder}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Box>

            {/* Summary Box */}
            <Box
              sx={{
                bgcolor: LASON_COLORS.cream,
                p: 2,
                borderRadius: '14px',
                border: `1px solid ${LASON_COLORS.stoneBorder}`,
                mb: 2.5,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75, fontSize: '0.85rem', color: '#57534E' }}>
                <span>{t.cart.subTotalLabel}</span>
                <span style={{ fontFamily: LASON_FONTS.mono }}>{formatVND(subTotal)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, fontSize: '0.85rem', color: '#57534E' }}>
                <span>{t.cart.shippingFeeLabel}</span>
                <span style={{ fontFamily: LASON_FONTS.mono }}>
                  {shippingFee === 0 ? t.cart.freeShipping : formatVND(shippingFee)}
                </span>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  color: LASON_COLORS.brown,
                }}
              >
                <span>{t.cart.grandTotalLabel}</span>
                <span style={{ fontFamily: LASON_FONTS.mono }}>{formatVND(grandTotal)}</span>
              </Box>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting}
              sx={{ py: 1.5, fontSize: '0.85rem', fontWeight: 700 }}
            >
              {submitting ? t.cart.submittingOrderBtn : t.cart.submitOrderBtn}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Order Confirmation Modal */}
      <Dialog
        open={Boolean(completedOrder)}
        onClose={() => setCompletedOrder(null)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, p: 1 } } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: LASON_FONTS.serif, fontWeight: 600 }}>
          <CheckCircleOutlineIcon color="success" />
          {t.cart.successModalTitle}
        </DialogTitle>
        {completedOrder && (
          <DialogContent dividers>
            <Stack spacing={1.25} sx={{ fontSize: '0.875rem' }}>
              <Typography variant="body2" sx={{ color: LASON_COLORS.stoneMuted }}>
                {t.cart.successModalIntro}
              </Typography>
              <Box sx={{ bgcolor: LASON_COLORS.cream, p: 2, borderRadius: 2, border: `1px solid ${LASON_COLORS.stoneBorder}` }}>
                <Typography variant="body2">
                  • <strong>{t.cart.orderCodeLabel}</strong>{' '}
                  <span style={{ fontFamily: LASON_FONTS.mono }}>{completedOrder.orderCode}</span>
                </Typography>
                <Typography variant="body2">
                  • <strong>{t.cart.customerLabel}</strong> {completedOrder.customerName} ({completedOrder.customerPhone})
                </Typography>
                <Typography variant="body2">
                  • <strong>{t.cart.deliveryLabel}</strong> {completedOrder.deliveryMode}
                </Typography>
                <Typography variant="body2">
                  • <strong>{t.cart.pickupAddressLabel}</strong> {completedOrder.deliveryAddress}
                </Typography>
                <Typography variant="body2" sx={{ color: LASON_COLORS.brown, fontWeight: 700, mt: 0.5, fontFamily: LASON_FONTS.mono }}>
                  • {t.cart.grandTotalLabel} {formatVND(completedOrder.grandTotal)}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: LASON_COLORS.stoneMuted }}>
                {t.cart.successModalFooter}
              </Typography>
            </Stack>
          </DialogContent>
        )}
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" fullWidth onClick={() => setCompletedOrder(null)}>
            {t.cart.doneBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
