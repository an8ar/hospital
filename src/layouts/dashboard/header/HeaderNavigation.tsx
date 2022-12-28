import React from 'react';

import { Box, Link, styled } from '@mui/material';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import { DASHBOARD_NAVIGATION } from '../constants';

export function HeaderNavigation() {
  return (
    <RootStyle>
      {DASHBOARD_NAVIGATION.map(({ title, path }) => (
        <LinkStyle variant="body2" to={path} component={RouterLink} key={title + path}>
          {title}
        </LinkStyle>
      ))}
    </RootStyle>
  );
}

const LinkStyle = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.grey[0],
  fontWeight: 'normal',
})) as typeof Link;

const RootStyle = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(2),
}));
