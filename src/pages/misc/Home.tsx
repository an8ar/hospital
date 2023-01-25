import React from 'react';

import { Page } from '~/components/Page';
import { CartComponent } from '~/features/cart';

export function HomePage() {
  return (
    <Page title="Homepage">
      <CartComponent />
    </Page>
  );
}
