import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from '@mui/material';
import type {
  BeanProduct,
  BeanWeight,
  GrindOption,
} from '../../types/product.types';
import { GRIND_OPTIONS } from '../../services/mock/mockData';
import { productApi } from '../../services/api/product.api';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { GRIND_LABELS_EN, localizeBeans } from '../../i18n/translations';
import { formatVND } from '../../utils/formatters';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

interface BeanCardProps {
  bean: BeanProduct;
  onAdd: (bean: BeanProduct, weight: BeanWeight, grind: GrindOption) => void;
}

const BeanProductCard: React.FC<BeanCardProps> = ({ bean, onAdd }) => {
  const { lang, t } = useLanguage();
  const [weight, setWeight] = useState<BeanWeight>('250g');
  const [grind, setGrind] = useState<GrindOption>('Nguyên hạt');

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '18px',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 24px rgba(61, 35, 20, 0.08)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Fixed-height Image & Badges */}
        <Box sx={{ position: 'relative', height: 220, bgcolor: '#F5F5F4', overflow: 'hidden', flexShrink: 0 }}>
          <Box
            component="img"
            src={bean.image}
            alt={bean.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <Box
            component="span"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: LASON_COLORS.brown,
              color: LASON_COLORS.white,
              fontFamily: LASON_FONTS.mono,
              fontSize: '0.7rem',
              fontWeight: 600,
              px: 1.25,
              py: 0.45,
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
            }}
          >
            {bean.badge}
          </Box>
          <Box
            component="span"
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              bgcolor: 'rgba(28, 25, 23, 0.84)',
              color: '#FDE68A',
              fontFamily: LASON_FONTS.mono,
              fontSize: '0.7rem',
              fontWeight: 500,
              px: 1.25,
              py: 0.45,
              borderRadius: '6px',
            }}
          >
            {bean.roast}
          </Box>
        </Box>

        {/* Aligned Content Block */}
        <Box sx={{ p: 2.75, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography
            sx={{
              fontFamily: LASON_FONTS.mono,
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: LASON_COLORS.stoneMuted,
              mb: 0.75,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {bean.origin}
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontFamily: LASON_FONTS.serif,
              fontSize: '1.2rem',
              fontWeight: 600,
              lineHeight: 1.3,
              color: LASON_COLORS.dark,
              minHeight: '3.12rem', // Cố định chiều cao 2 dòng tiêu đề
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1,
            }}
          >
            {bean.name}
          </Typography>

          <Typography
            sx={{
              fontSize: '0.84rem',
              color: '#57534E',
              lineHeight: 1.6,
              minHeight: '5.35rem', // Cố định chiều cao 4 dòng mô tả
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {bean.story}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
            {bean.notes.map((note) => (
              <Chip
                key={note}
                label={`✨ ${note}`}
                size="small"
                sx={{
                  height: 26,
                  bgcolor: LASON_COLORS.cream,
                  border: `1px solid ${LASON_COLORS.stoneBorder}`,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Aligned Footer: Variant Controls & Add to Cart */}
      <Box
        sx={{
          p: 2.75,
          pt: 2,
          borderTop: `1px solid ${LASON_COLORS.stoneBorder}`,
          bgcolor: '#FAFAF9',
        }}
      >
        <Grid container spacing={1.25} sx={{ mb: 1.75 }}>
          <Grid size={{ xs: 6 }}>
            <Typography
              sx={{
                fontFamily: LASON_FONTS.mono,
                fontSize: '0.66rem',
                fontWeight: 600,
                color: LASON_COLORS.stoneMuted,
                textTransform: 'uppercase',
                mb: 0.5,
                whiteSpace: 'nowrap',
              }}
            >
              {t.beansPage.weightLabel}
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={weight}
                onChange={(e) => setWeight(e.target.value as BeanWeight)}
                sx={{
                  height: 38,
                  fontFamily: LASON_FONTS.mono,
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  bgcolor: LASON_COLORS.white,
                }}
              >
                <MenuItem value="250g" sx={{ fontFamily: LASON_FONTS.mono, fontSize: '0.75rem' }}>
                  250g — {formatVND(bean.price250)}
                </MenuItem>
                <MenuItem value="500g" sx={{ fontFamily: LASON_FONTS.mono, fontSize: '0.75rem' }}>
                  500g — {formatVND(bean.price500)}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography
              sx={{
                fontFamily: LASON_FONTS.mono,
                fontSize: '0.66rem',
                fontWeight: 600,
                color: LASON_COLORS.stoneMuted,
                textTransform: 'uppercase',
                mb: 0.5,
                whiteSpace: 'nowrap',
              }}
            >
              {t.beansPage.grindLabel}
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={grind}
                onChange={(e) => setGrind(e.target.value as GrindOption)}
                sx={{
                  height: 38,
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  bgcolor: LASON_COLORS.white,
                }}
              >
                {GRIND_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.75rem' }}>
                    {lang === 'en' ? GRIND_LABELS_EN[opt.value] : opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onAdd(bean, weight, grind)}
          sx={{ height: 42, fontSize: '0.84rem', fontWeight: 600 }}
        >
          {t.beansPage.addToCartBtn}
        </Button>
      </Box>
    </Card>
  );
};

export const BeansPage: React.FC = () => {
  const { addBeanToCart } = useCart();
  const { lang, t } = useLanguage();
  const [rawBeans, setRawBeans] = useState<BeanProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi
      .getBeans()
      .then(setRawBeans)
      .finally(() => setLoading(false));
  }, []);

  const beans = localizeBeans(rawBeans, lang);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'flex-end' },
          justifyContent: 'space-between',
          gap: 2.5,
          mb: 4,
        }}
      >
        <Box sx={{ maxWidth: 640 }}>
          <Typography
            sx={{
              fontFamily: LASON_FONTS.mono,
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: LASON_COLORS.brown,
            }}
          >
            {t.beansPage.eyebrow}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.75rem', sm: '2.15rem' }, mt: 0.5 }}
          >
            {t.beansPage.title}
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#57534E', mt: 0.5 }}>
            {t.beansPage.subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '12px',
            px: 2.25,
            py: 1.5,
            fontSize: '0.78rem',
            lineHeight: 1.5,
            color: '#78350F',
            maxWidth: { md: 380 },
            flexShrink: 0,
          }}
        >
          🎁 <strong>{t.beansPage.promoBold}</strong> {t.beansPage.promoText}
        </Box>
      </Box>

      {/* Lưới sản phẩm cân đối (2 cột trên Tablet, 2 hoặc 3 cột đều chiều cao trên Desktop) */}
      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Grid size={{ xs: 12, sm: 6, lg: 6 }} key={idx}>
                <Skeleton variant="rounded" height={480} sx={{ borderRadius: '18px' }} />
              </Grid>
            ))
          : beans.map((bean) => (
              <Grid size={{ xs: 12, sm: 6, lg: beans.length === 4 ? 6 : 4 }} key={bean.id}>
                <BeanProductCard bean={bean} onAdd={addBeanToCart} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};
