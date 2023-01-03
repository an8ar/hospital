import React from 'react';

import { Box } from '@mui/material';

import procedureApi from '~/api/procedures/api';

import { CartComponent } from '../../cart';
import { ShopProductList } from './index';

export function Procedures() {
  const { data, isLoading } = procedureApi.endpoints.getProcedures.useQuery(null);
  const procedures = data || [];
  return (
    <Box>
      <ShopProductList products={procedures} loading={isLoading} />
      <CartComponent />
    </Box>
  );
}
