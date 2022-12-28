import React, { useMemo, ReactNode } from 'react';

import { CssBaseline } from '@mui/material';
import {
  createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider,
} from '@mui/material/styles';
import { useDarkMode } from 'usehooks-ts';

import breakpoints from './breakpoints';
import { componentsOverrides } from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';
import zIndex from './zIndex';

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { isDarkMode } = useDarkMode();

  const theme = useMemo(
    () => createTheme({
      palette: isDarkMode ? palette.dark : palette.light,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows: isDarkMode ? shadows.dark : shadows.light,
      customShadows: isDarkMode ? customShadows.dark : customShadows.light,
      zIndex,
    }),
    [isDarkMode],
  );

  theme.components = componentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
