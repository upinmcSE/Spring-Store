import React from 'react';
import { AppBar, Box, Button, ButtonBase, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCount, openCart } = useCart();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', desktopLabel: t.nav.storyDesktop, mobileLabel: t.nav.storyMobile },
    { path: '/beans', desktopLabel: t.nav.beansDesktop, mobileLabel: t.nav.beansMobile },
    { path: '/drinks', desktopLabel: t.nav.drinksDesktop, mobileLabel: t.nav.drinksMobile },
    {
      path: '/gear-map',
      desktopLabel: t.nav.gearMapDesktop,
      mobileLabel: t.nav.gearMapMobile,
    },
  ];

  const isRouteActive = (itemPath: string) => {
    if (itemPath === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 40,
        bgcolor: 'rgba(250, 246, 240, 0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${LASON_COLORS.stoneBorder}`,
        color: LASON_COLORS.dark,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: 76,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr auto', lg: '240px 1fr 240px' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Left Zone: Brand Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <BrandLogo onClick={() => navigate('/')} />
        </Box>

        {/* Center Zone: Desktop Pill Navigation (Centered, never shifts when language changes) */}
        <Box
          component="nav"
          sx={{
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            justifySelf: 'center',
            gap: 0.5,
            bgcolor: 'rgba(231, 229, 228, 0.7)',
            p: 0.6,
            borderRadius: '999px',
            border: `1px solid ${LASON_COLORS.stoneBorder}`,
          }}
        >
          {navItems.map((item) => {
            const active = isRouteActive(item.path);
            return (
              <ButtonBase
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  px: 2,
                  height: 36,
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease',
                  bgcolor: active ? LASON_COLORS.brown : 'transparent',
                  color: active ? LASON_COLORS.white : '#44403C',
                  boxShadow: active ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                  '&:hover': {
                    color: active ? LASON_COLORS.white : LASON_COLORS.brown,
                  },
                }}
              >
                {item.desktopLabel}
              </ButtonBase>
            );
          })}
        </Box>

        {/* Right Zone: Language Switcher + Cart Button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1.25,
            flexShrink: 0,
          }}
        >
          <LanguageSwitcher />

          <Button
            onClick={openCart}
            variant="contained"
            color="primary"
            sx={{
              height: 40,
              borderRadius: '999px',
              px: { xs: 1.75, sm: 2.25 },
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              boxShadow: '0 2px 6px rgba(141, 83, 43, 0.2)',
            }}
          >
            <span>🛒 {t.nav.cartButton}</span>
            <Box
              component="span"
              sx={{
                bgcolor: LASON_COLORS.white,
                color: LASON_COLORS.brown,
                fontFamily: LASON_FONTS.mono,
                fontSize: '0.72rem',
                fontWeight: 700,
                minWidth: 22,
                height: 20,
                px: 0.75,
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {totalCount}
            </Box>
          </Button>
        </Box>
      </Container>

      {/* Mobile & Tablet Navigation Bar */}
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          borderTop: `1px solid ${LASON_COLORS.stoneBorder}`,
          bgcolor: LASON_COLORS.white,
          px: 1.5,
          py: 0.75,
        }}
      >
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0.75,
          }}
        >
          {navItems.map((item) => {
            const active = isRouteActive(item.path);
            return (
              <ButtonBase
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  height: 34,
                  px: 1,
                  borderRadius: '8px',
                  fontSize: { xs: '0.72rem', sm: '0.78rem' },
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  bgcolor: active ? LASON_COLORS.brown : '#F5F5F4',
                  color: active ? LASON_COLORS.white : '#44403C',
                }}
              >
                {item.mobileLabel}
              </ButtonBase>
            );
          })}
        </Container>
      </Box>
    </AppBar>
  );
};
