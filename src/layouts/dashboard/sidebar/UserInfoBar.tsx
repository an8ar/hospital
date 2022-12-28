import React from 'react';

import { Typography, Box } from '@mui/material';
import styled from 'styled-components';

import { Iconify } from '~/components/Iconify';
import { AuthUser } from '~/features/auth';

type Props = {
  user: AuthUser;
};

export function UserInfoBar({ user }: Props) {
  return (
    <RootStyle>
      <Typography variant="body2">
        Hello,
        {' '}
        <b>{user.first}</b>
      </Typography>
      <Iconify icon="material-symbols:chevron-right" width={24} height={24} />
    </RootStyle>
  );
}

const RootStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.grey[100],
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3.125),
}));
