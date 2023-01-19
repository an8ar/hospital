import React from 'react';

import { styled, Container, Box } from '@mui/material';

import { Page } from '~/components/Page';
import { CartCheckout } from '~/features/cart';
import { Procedures } from '~/features/procedures';

const ContentStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  background: 'white',
  borderRadius: '30px',
  padding: '4vh',
  border: '1px black solid',
}));

export function HomePage() {
  return (
    <Page title="Homepage">
      <Container sx={{ paddingTop: '5vh' }}>
        <Box sx={{ textAlign: 'center' }}>Nutrix(I need logo)</Box>
        <ContentStyle>
          <Procedures />
          <CartCheckout />
        </ContentStyle>
      </Container>
    </Page>
  );
}
