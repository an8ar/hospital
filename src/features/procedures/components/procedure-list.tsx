import React from 'react';

import { Box } from '@mui/material';

import { ProcedureCard } from './procedure-card';

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

export function ProcedureList({ products, loading }: Props) {
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
      {(loading ? [...Array(products.length)] : products).map((product) => (product ? (
        <ProcedureCard key={product.id} product={product} />
      ) : (
        <div>Идет Загрузка</div>
      )))}
    </Box>
  );
}
