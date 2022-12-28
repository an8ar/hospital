import React from 'react';

import {
  Link, Stack, styled,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { DASHBOARD_NAVIGATION } from '../constants';

export default function SidebarNavigation() {
  return (
    <Stack sx={{ flex: 1 }}>
      {DASHBOARD_NAVIGATION.map(({ path, title }) => (
        <LinkStyle variant="body2" to={path} component={RouterLink} key={title + path}>
          {title}
        </LinkStyle>
      ))}
    </Stack>
  );
}

const LinkStyle = styled(Link)(({ theme }) => ({
  fontWeight: 'normal',
  lineHeight: '48px',
  width: '100%',
  paddingLeft: theme.spacing(1.5),
  color: theme.palette.grey[500],
  verticalAlign: 'center',
})) as typeof Link;
