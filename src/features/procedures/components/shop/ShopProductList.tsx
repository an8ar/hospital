import React from 'react';

import { Box } from '@mui/material';

import ShopProductCard from './ShopProductCard';

// ----------------------------------------------------------------------

type Procedure = {
  id: number,
  createdAt: string,
  updatedAt: string,
  specializationId: number,
  name: string,
  slug: string,
  description: string,
}

type Props = {
  products: Procedure[];
  loading: boolean;
};

export default function ShopProductList({ products, loading }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {(loading ? [...Array(12)] : products).map((product, index) => (product ? (
        <ShopProductCard key={product.id} product={product} />
      ) : (
        <div>Nothing</div>
      )))}
    </Box>
  );
}
