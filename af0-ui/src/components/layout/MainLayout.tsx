import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { TopAnnouncementBar } from './TopAnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../../features/cart/CartDrawer';
import { LASON_COLORS } from '../../theme';

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: LASON_COLORS.cream,
        color: LASON_COLORS.dark,
      }}
    >
      <TopAnnouncementBar />
      <Header />
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>
      <Footer />
      <CartDrawer />
    </Box>
  );
};

