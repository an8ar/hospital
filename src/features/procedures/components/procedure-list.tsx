import React from 'react';

import { Box } from '@mui/material';

import { Procedure } from '../types';
import { ProcedureCard } from './procedure-card';

// ----------------------------------------------------------------------

type Props = {
  products: Procedure[];
};

export function ProcedureList({ products }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {products && products.map((item) => <ProcedureCard key={item.id} product={item} />)}
    </Box>
  );
}
