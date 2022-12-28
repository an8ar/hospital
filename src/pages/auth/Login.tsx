import React from 'react';

import {
  Box, Container, styled, Typography,
} from '@mui/material';

import { Page } from '~/components/Page';
import { APPLICATION_NAME } from '~/config';
import { LoginForm } from '~/features/auth';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export function LoginPage() {
  return (
    <Page title="Login">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Войти в
              {' '}
              {APPLICATION_NAME}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Введите свои даные</Typography>
          </Box>
          <LoginForm />
        </ContentStyle>
      </Container>
    </Page>
  );
}
