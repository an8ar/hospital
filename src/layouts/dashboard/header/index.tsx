import React from 'react';

import { Box, AppBar, Toolbar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { Logo } from '~/assets/logo';
import { Iconify } from '~/components/Iconify';
import { HEADER } from '~/constants';
import { useResponsive } from '~/hooks/useResponsive';

import { HeaderInfo } from './HeaderInfo';
import { HeaderNavigation } from './HeaderNavigation';

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
  zIndex: theme.zIndex.dashboardAppBar,
  backgroundColor: theme.palette.grey[800],
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  justifyContent: 'space-between',
}));

type Props = {
  onOpenSidebar: VoidFunction;
};

export function DashboardHeader({ onOpenSidebar }: Props) {
  const isLaptop = useResponsive('up', 'md');

  const theme = useTheme();

  const sx = {
    backgroundColor: theme.palette.grey[800],
    px: { lg: 5 },
    minHeight: '100% !important',
  };

  return (
    <RootStyle>
      <Toolbar sx={sx}>
        <BoxStyle>
          <Logo />
          {isLaptop && (
            <>
              <HeaderNavigation />
              <HeaderInfo />
            </>
          )}
          {!isLaptop && (
            <Iconify icon="material-symbols:menu" onClick={onOpenSidebar} width={24} height={24} />
          )}
        </BoxStyle>
      </Toolbar>
    </RootStyle>
  );
}
