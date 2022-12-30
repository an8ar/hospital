import React from 'react';

import { Page } from '~/components/Page';
import { Procedures } from '~/features/procedures/components/Procedures';

export function HomePage() {
  return (
    <Page title="Homepage">
      <Procedures/>
    </Page>
  );
}
