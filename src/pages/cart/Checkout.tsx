import React from 'react';

import { Page } from '~/components/Page';
import { CartCheckout } from '~/features/cart';

export function CheckoutPage() {
  return (
    <Page title="Checkoutpage">
      <CartCheckout />
    </Page>
  );
}
