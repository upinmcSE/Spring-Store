import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { lasonPalette } from './palette';
import { lasonTypography } from './typography';
import { lasonComponents } from './components';
import { LASON_LAYOUT } from './tokens';

const baseTheme = createTheme({
  palette: lasonPalette,
  typography: lasonTypography,
  shape: {
    borderRadius: LASON_LAYOUT.borderRadiusSm,
  },
  components: lasonComponents,
});

export const lasonTheme = responsiveFontSizes(baseTheme);

export * from './tokens';

