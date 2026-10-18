import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { DrinkItem, DrinkVenueType } from '../../types/product.types';
import { productApi } from '../../services/api/product.api';
import { useLanguage } from '../../context/LanguageContext';
import { localizeDrinks } from '../../i18n/translations';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

export const DrinksPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | DrinkVenueType>('all');
  const [rawDrinks, setRawDrinks] = useState<DrinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productApi
      .getDrinks(filter)
      .then(setRawDrinks)
      .finally(() => setLoading(false));
  }, [filter]);

  const drinks = localizeDrinks(rawDrinks, lang);

  const filterButtons: { value: 'all' | DrinkVenueType; label: string }[] = [
    { value: 'all', label: t.drinksPage.filterAll },
    { value: 'truck', label: t.drinksPage.filterTruck },
    { value: 'shop', label: t.drinksPage.filterShop },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Experience Banner */}
      <Box
        sx={{
          bgcolor: LASON_COLORS.dark,
          color: LASON_COLORS.white,
          borderRadius: '18px',
          p: { xs: 3, sm: 4 },
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'flex-start', lg: 'center' },
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Stack spacing={1.25} sx={{ maxWidth: 660 }}>
          <Box>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                bgcolor: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                color: '#FCD34D',
                fontFamily: LASON_FONTS.mono,
                fontSize: '0.7rem',
                fontWeight: 600,
                px: 1.5,
                py: 0.45,
                borderRadius: '6px',
              }}
            >
              {t.drinksPage.badge}
            </Box>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontFamily: LASON_FONTS.serif,
              fontSize: { xs: '1.5rem', sm: '1.85rem' },
              color: LASON_COLORS.white,
            }}
          >
            {t.drinksPage.title}
          </Typography>

          <Typography sx={{ color: '#D6D3D1', fontSize: { xs: '0.82rem', sm: '0.875rem' }, lineHeight: 1.6 }}>
            {t.drinksPage.subtitle}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            gap: 0.75,
            p: 0.6,
            borderRadius: '12px',
            bgcolor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            flexShrink: 0,
          }}
        >
          {filterButtons.map((btn) => {
            const active = filter === btn.value;
            return (
              <ButtonBase
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                sx={{
                  px: 1.75,
                  height: 36,
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  bgcolor: active ? LASON_COLORS.brown : 'transparent',
                  color: LASON_COLORS.white,
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    bgcolor: active ? LASON_COLORS.brown : 'rgba(255,255,255,0.12)',
                  },
                }}
              >
                {btn.label}
              </ButtonBase>
            );
          })}
        </Box>
      </Box>

      {/* Drinks Grid — 6 cards aligned strictly in rows */}
      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={idx}>
                <Skeleton variant="rounded" height={400} sx={{ borderRadius: '18px' }} />
              </Grid>
            ))
          : drinks.map((drink) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={drink.id}>
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
                    <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
                      <Box
                        component="img"
                        src={drink.image}
                        alt={drink.name}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <Box
                        component="span"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: 'rgba(28, 25, 23, 0.86)',
                          color: '#FCD34D',
                          fontFamily: LASON_FONTS.mono,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          px: 1.25,
                          py: 0.45,
                          borderRadius: '6px',
                        }}
                      >
                        {drink.badgeText}
                      </Box>
                    </Box>

                    <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flex: 1 }}>
                      {/* Fixed-height Title + Price Row */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: 1.5,
                          minHeight: '2.9rem',
                          mb: 1.25,
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            fontFamily: LASON_FONTS.serif,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            lineHeight: 1.3,
                            color: LASON_COLORS.dark,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {drink.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: LASON_FONTS.mono,
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: LASON_COLORS.brown,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            pt: 0.15,
                          }}
                        >
                          {drink.priceLabel}
                        </Typography>
                      </Box>

                      {/* Uniform Base Bean Badge */}
                      <Box
                        sx={{
                          fontFamily: LASON_FONTS.mono,
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          color: '#92400E',
                          bgcolor: '#FFFBEB',
                          border: '1px solid #FDE68A',
                          px: 1.25,
                          py: 0.6,
                          borderRadius: '6px',
                          mb: 1.25,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {t.drinksPage.baseBeanPrefix} {drink.baseBean}
                      </Box>

                      <Typography
                        sx={{
                          fontSize: '0.84rem',
                          color: '#57534E',
                          lineHeight: 1.6,
                          minHeight: '4.05rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {drink.desc}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ px: 2.5, pb: 2.5, pt: 0.5 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          drink.availableAt === 'truck' ? '/gear-map?spot=1' : '/gear-map?spot=0',
                        )
                      }
                      sx={{
                        height: 38,
                        borderColor: LASON_COLORS.stoneBorder,
                        color: '#44403C',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        borderRadius: '10px',
                        '&:hover': {
                          borderColor: LASON_COLORS.brown,
                          color: LASON_COLORS.brown,
                          bgcolor: 'rgba(141, 83, 43, 0.04)',
                        },
                      }}
                    >
                      {t.drinksPage.viewMapBtn}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};
