import React from 'react';

import { Box, styled } from '@mui/material';

import { Logo } from '~/assets/logo';
import { Iconify } from '~/components/Iconify';
import { HEADER } from '~/constants';

type Props = {
  onCloseSidebar: VoidFunction;
};

export function SidebarHeader({ onCloseSidebar }: Props) {
  return (
    <RootStyle>
      <Logo />
      <Iconify icon="material-symbols:close" width={24} height={24} onClick={onCloseSidebar} />
    </RootStyle>
  );
}

const RootStyle = styled(Box)(({ theme }) => ({
  height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.grey[0],
  marginBottom: theme.spacing(3.125),
}));
