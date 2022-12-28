import React, { useState } from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import { HEADER } from '~/constants';
import { useResponsive } from '~/hooks/useResponsive';

import { DashboardHeader } from './header';
import { DashboardSidebar } from './sidebar';

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
  paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
  },
}));

type Props = {
  children?: React.ReactElement;
};

export function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);

  const isLaptop = useResponsive('up', 'md');

  const onOpenSidebar = () => {
    setOpen(true);
  };

  const onCloseSidebar = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader onOpenSidebar={onOpenSidebar} />
      {!isLaptop && <DashboardSidebar open={open} onCloseSidebar={onCloseSidebar} />}
      <MainStyle>{children || <Outlet />}</MainStyle>
    </Box>
  );
}
