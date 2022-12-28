import React from 'react';

import { Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import { ServerErrorIllustration } from '~/assets';
import { Page } from '~/components/Page';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export function Page500() {
  return (
    <Page title="500 Internal Server Error">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>

          <ServerErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
