import React from 'react';

import { Box } from '@mui/material';

import procedureApi from '~/api/procedures/api';

import { CartComponent } from '../../cart';
import { ShopProductList } from './shop';

export function Procedures() {
  const { data, isLoading } = procedureApi.endpoints.getProcedures.useQuery(null);
  const procedures = data || [];
  if (isLoading) {
    return (<>Loading</>);
  }

  return (
    <Box>
      <ShopProductList products={procedures} loading={isLoading} />
      <CartComponent />
    </Box>
  );
}
