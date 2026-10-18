import type { PaletteOptions } from '@mui/material/styles';
import { LASON_COLORS } from './tokens';

declare module '@mui/material/styles' {
  interface Palette {
    lason: typeof LASON_COLORS;
  }
  interface PaletteOptions {
    lason?: typeof LASON_COLORS;
  }
}

export const lasonPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: LASON_COLORS.brown,
    dark: LASON_COLORS.dark,
    light: '#B07043',
    contrastText: LASON_COLORS.white,
  },
  secondary: {
    main: LASON_COLORS.gold,
    light: LASON_COLORS.goldLight,
    dark: '#B45309',
    contrastText: LASON_COLORS.white,
  },
  success: {
    main: LASON_COLORS.green,
    contrastText: LASON_COLORS.white,
  },
  background: {
    default: LASON_COLORS.cream,
    paper: LASON_COLORS.white,
  },
  text: {
    primary: LASON_COLORS.dark,
    secondary: LASON_COLORS.stoneMuted,
  },
  divider: LASON_COLORS.stoneBorder,
  lason: LASON_COLORS,
};

