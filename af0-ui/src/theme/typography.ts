import type { TypographyVariantsOptions } from '@mui/material/styles';
import { LASON_FONTS } from './tokens';

export const lasonTypography: TypographyVariantsOptions = {
  fontFamily: LASON_FONTS.sans,
  h1: {
    fontFamily: LASON_FONTS.serif,
    fontWeight: 600,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: LASON_FONTS.serif,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.015em',
  },
  h3: {
    fontFamily: LASON_FONTS.serif,
    fontWeight: 600,
    lineHeight: 1.28,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: LASON_FONTS.serif,
    fontWeight: 600,
    lineHeight: 1.32,
  },
  h5: {
    fontFamily: LASON_FONTS.sans,
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: LASON_FONTS.sans,
    fontWeight: 600,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontFamily: LASON_FONTS.sans,
    fontWeight: 600,
  },
  subtitle2: {
    fontFamily: LASON_FONTS.mono,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  overline: {
    fontFamily: LASON_FONTS.mono,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  body1: {
    fontFamily: LASON_FONTS.sans,
    lineHeight: 1.65,
    letterSpacing: '-0.005em',
  },
  body2: {
    fontFamily: LASON_FONTS.sans,
    lineHeight: 1.6,
  },
  caption: {
    fontFamily: LASON_FONTS.mono,
    lineHeight: 1.5,
  },
  button: {
    fontFamily: LASON_FONTS.sans,
    fontWeight: 600,
    letterSpacing: '-0.005em',
    textTransform: 'none',
  },
};
