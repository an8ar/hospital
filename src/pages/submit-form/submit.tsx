import React from 'react';

import { styled, Container, Box } from '@mui/material';

import { Page } from '~/components/Page';
import { CheckoutForm } from '~/features/checkout';

const ContentStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  background: 'white',
  borderRadius: '30px',
  padding: '4vh',
  border: '1px black solid',
}));
export function SubmitPage() {
  return (
    <Page title="Homepage">
      <Container sx={{ paddingTop: '5vh' }}>
        <Box sx={{ textAlign: 'center' }}>Nutrix(I need logo)</Box>
        <ContentStyle>
          <CheckoutForm />
        </ContentStyle>
      </Container>
    </Page>
  );
}
