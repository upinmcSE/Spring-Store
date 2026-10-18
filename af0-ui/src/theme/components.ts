import type { Components, Theme } from '@mui/material/styles';
import { LASON_COLORS, LASON_FONTS, LASON_LAYOUT } from './tokens';

export const lasonComponents: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      ':root': {
        '--lason-brown': LASON_COLORS.brown,
        '--lason-dark': LASON_COLORS.dark,
        '--lason-cream': LASON_COLORS.cream,
        '--lason-sand': LASON_COLORS.sand,
        '--lason-gold': LASON_COLORS.gold,
        '--lason-green': LASON_COLORS.green,
        '--font-sans': LASON_FONTS.sans,
        '--font-serif': LASON_FONTS.serif,
        '--font-mono': LASON_FONTS.mono,
      },
      html: {
        scrollBehavior: 'smooth',
        fontFamily: LASON_FONTS.sans,
      },
      body: {
        fontFamily: LASON_FONTS.sans,
        backgroundColor: LASON_COLORS.cream,
        color: LASON_COLORS.dark,
        margin: 0,
        padding: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        '::selection': {
          backgroundColor: LASON_COLORS.brown,
          color: LASON_COLORS.white,
        },
      },
      'code, pre, .font-mono': {
        fontFamily: LASON_FONTS.mono,
      },
      '.leaflet-container': {
        fontFamily: LASON_FONTS.sans,
        borderRadius: '14px',
        zIndex: 10,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        fontFamily: LASON_FONTS.sans,
        borderRadius: LASON_LAYOUT.borderRadiusSm,
        padding: '10px 20px',
        fontWeight: 600,
        transition: 'all 0.2s ease-in-out',
      },
      contained: {
        backgroundColor: LASON_COLORS.brown,
        color: LASON_COLORS.white,
        '&:hover': {
          backgroundColor: LASON_COLORS.dark,
        },
      },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: LASON_LAYOUT.borderRadiusLg,
        border: `1px solid ${LASON_COLORS.stoneBorder}`,
        backgroundColor: LASON_COLORS.white,
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        fontFamily: LASON_FONTS.sans,
        borderRadius: LASON_LAYOUT.borderRadiusSm,
        backgroundColor: LASON_COLORS.white,
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: LASON_COLORS.brown,
          borderWidth: 2,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontFamily: LASON_FONTS.mono,
        fontWeight: 500,
        letterSpacing: '-0.01em',
      },
    },
  },
};
