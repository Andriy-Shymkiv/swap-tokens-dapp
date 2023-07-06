import { createTheme, ThemeOptions } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';

export const themeOptions: ThemeOptions = {
  palette,
  typography,
  shape: { borderRadius: 8 },
  spacing: 4,
};

export const theme = createTheme(themeOptions);
