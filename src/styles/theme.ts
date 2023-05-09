import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            background: 'transparent',
          },
        },
      },
    },
  },
});
