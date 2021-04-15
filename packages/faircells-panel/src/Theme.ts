import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    kale: {
      headers: {
        main: string;
      };
    };
  }

  interface ThemeOptions {
    kale?: {
      headers?: {
        main?: string;
      };
    };
  }
}

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#00e676',
      dark: '#00a152',
      light: '#33eb91',
    },
    primary: {
      main: '#2196f3',
      dark: '#1769aa',
      light: '#4dabf5',
    },
  },
});
