import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: LASON_COLORS.dark,
        color: '#D6D3D1',
        py: 4,
        px: 2,
        borderTop: '1px solid #292524',
        mt: 'auto',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: LASON_COLORS.brown,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: LASON_FONTS.serif,
              fontWeight: 700,
              color: LASON_COLORS.white,
              flexShrink: 0,
            }}
          >
            Ls&apos;
          </Box>
          <Typography sx={{ fontSize: '0.78rem' }}>
            <strong style={{ color: LASON_COLORS.white }}>La Sơn Coffee Roastery</strong> —{' '}
            {t.brand.footerTagline}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: '0.78rem' }}>{t.brand.footerAddress}</Typography>
      </Container>
    </Box>
  );
};
