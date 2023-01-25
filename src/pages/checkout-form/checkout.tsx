import React from 'react';

import { styled, Container } from '@mui/material';

import { Page } from '~/components/Page';
import { CheckoutForm } from '~/features/checkout';
import { useResponsive } from '~/hooks/useResponsive';

const ContentStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  background: 'white',
  padding: '12px',
}));
export function CheckoutPage() {
  const isMobile = useResponsive('down', 'sm');
  const border = { borderRadius: '30px' };
  const shadow = { boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)' };
  if (isMobile) {
    border.borderRadius = 'none';
    shadow.boxShadow = 'none';
  }
  return (
    <Page title="Homepage">
      <Container sx={{ paddingTop: '12px' }}>
        <ContentStyle sx={{ ...border, ...shadow }}>
          <CheckoutForm />
        </ContentStyle>
      </Container>
    </Page>
  );
}
