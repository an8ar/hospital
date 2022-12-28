import React from 'react';

import {
  Box, Link, styled, useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';
import { HEADER } from '~/constants';

import { DASHBOARD_HELP_NAVIGATION } from '../constants';

export function SidebarFooter() {
  return (
    <RootStyle>
      {DASHBOARD_HELP_NAVIGATION.map(({ title, path, icon }) => (
        <LinkStyle variant="body2" to={path} component={RouterLink} key={path + title}>
          <FooterIcon icon={icon} />
          {title}
        </LinkStyle>
      ))}
    </RootStyle>
  );
}

function FooterIcon({ icon }: Record<'icon', string>) {
  const theme = useTheme();

  return <Iconify icon={icon} width={24} height={24} margin={theme.spacing(1.5)} />;
}

const LinkStyle = styled(Link)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: 48,
  cursor: 'pointer',
  color: 'inherit',
}) as typeof Link;

const RootStyle = styled(Box)(({ theme }) => ({
  height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  color: theme.palette.grey[500],
  marginBottom: theme.spacing(3.125),
}));
