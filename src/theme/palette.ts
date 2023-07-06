import { PaletteOptions } from '@mui/material';

type CustomPalette = Pick<
  PaletteOptions,
  | 'common'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'grey'
  | 'text'
  | 'divider'
  | 'background'
>;

const whiteColor = '#FFF';
const lightColor = '76, 78, 100';
const mainColor = lightColor;

export const palette: CustomPalette = {
  common: {
    black: '#000',
    white: whiteColor,
  },
  primary: {
    light: '#6F8CF3',
    main: '#666CFF',
    dark: '#5A5FE0',
    contrastText: whiteColor,
  },
  secondary: {
    light: '#7F889B',
    main: '#6D788D',
    dark: '#606A7C',
    contrastText: whiteColor,
  },
  error: {
    light: '#F7C0BE',
    main: '#FF4D49',
    dark: '#E04440',
    contrastText: whiteColor,
  },
  warning: {
    light: '#FDBE42',
    main: '#FDB528',
    dark: '#DF9F23',
    contrastText: whiteColor,
  },
  info: {
    light: '#40CDFA',
    main: '#26C6F9',
    dark: '#21AEDB',
    contrastText: whiteColor,
  },
  success: {
    light: '#D3F3EE',
    main: '#38D9C0',
    dark: '#64C623',
    contrastText: whiteColor,
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#F5F5F5',
    A200: '#EEEEEE',
    A400: '#BDBDBD',
    A700: '#616161',
  },
  text: {
    primary: `rgba(${mainColor}, 0.87)`,
    secondary: `rgba(${mainColor}, 0.6)`,
    disabled: `rgba(${mainColor}, 0.38)`,
  },
  divider: `rgba(${mainColor}, 0.12)`,
  background: {
    paper: whiteColor,
    default: whiteColor,
  },
};
