import React from 'react';

import { Container } from '@mui/material';

import { CheckoutVerification } from '~/features/checkout';

export function CheckoutConfirmation() {
  return (
    <Container>
      <CheckoutVerification />
    </Container>
  );
}
