import React from 'react';

import { Typography, Box } from '@mui/material';
import styled from 'styled-components';

import { Iconify } from '~/components/Iconify';
import { AuthUser } from '~/features/auth';

type UserMenuProps = {
  user: AuthUser;
};

export function UserMenu({ user }: UserMenuProps) {
  return (
    <RootStyle>
      <Typography variant="body2">
        Hello,
        {' '}
        <b>{user.first}</b>
      </Typography>
      <Iconify icon="mdi:expand-more" width={24} height={24} />
    </RootStyle>
  );
}

const RootStyle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});
