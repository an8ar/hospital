import React from 'react';

import { BoxProps, Box } from '@mui/material';
import {
  alpha, useTheme, styled, Theme,
} from '@mui/material/styles';

import { ColorSchema } from '../theme/palette';

type LabelColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

type LabelVariant = 'filled' | 'outlined' | 'ghost';

type RootStyleProps = {
  theme: Theme;
  ownerState: {
    color: LabelColor;
    variant: LabelVariant;
  };
};
const RootStyle = styled('span')<RootStyleProps>(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === 'light';
  const { color, variant } = ownerState;

  const styleFilled = (colorVariant: ColorSchema) => ({
    color: theme.palette[colorVariant].contrastText,
    backgroundColor: theme.palette[colorVariant].main,
  });

  const styleOutlined = (colorVariant: ColorSchema) => ({
    color: theme.palette[colorVariant].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[colorVariant].main}`,
  });

  const styleGhost = (colorVariant: ColorSchema) => ({
    color: theme.palette[colorVariant][isLight ? 'dark' : 'light'],
    backgroundColor: alpha(theme.palette[colorVariant].main, 0.16),
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
        ...(variant === 'filled' && { ...styleFilled(color) }),
        ...(variant === 'outlined' && { ...styleOutlined(color) }),
        ...(variant === 'ghost' && { ...styleGhost(color) }),
      }
      : {
        ...(variant === 'outlined' && {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.grey[500_32]}`,
        }),
        ...(variant === 'ghost' && {
          color: isLight ? theme.palette.text.secondary : theme.palette.common.white,
          backgroundColor: theme.palette.grey[500_16],
        }),
      }),
  };
});

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement | null;
  color?: LabelColor;
  variant?: LabelVariant;
}

export default function Label({
  children,
  color = 'default',
  variant = 'ghost',
  startIcon,
  endIcon,
  sx,
}: Props) {
  const theme = useTheme();

  const style = {
    width: 16,
    height: 16,
    '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
  };

  return (
    <RootStyle
      ownerState={{ color, variant }}
      sx={{
        ...(startIcon && { pl: 0.75 }),
        ...(endIcon && { pr: 0.75 }),
        ...sx,
      }}
      theme={theme}
    >
      {startIcon && <Box sx={{ mr: 0.75, ...style }}>{startIcon}</Box>}

      {children}

      {endIcon && <Box sx={{ ml: 0.75, ...style }}>{endIcon}</Box>}
    </RootStyle>
  );
}
