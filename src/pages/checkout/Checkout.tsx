import React from 'react';

import { Page } from '~/components/Page';
import { Checkout } from '~/features/checkout';

export function CheckoutPage() {
  return (
    <Page title="Checkoutpage">
      <Checkout />
    </Page>
  );
}
