import React from 'react';

import {
  Box, Typography,
} from '@mui/material';

// utils
// @types
import { Procedure } from '~/features/procedures';

import { CartProcedure } from '../types';

// ----------------------------------------------------------------------

type Props = {
  procedures: CartProcedure[];
  onDelete: (id: Procedure) => void;
  onDecreaseQuantity: (id: Procedure) => void;
  onIncreaseQuantity: (id: Procedure) => void;
};

export function CartProcedureList({
  procedures,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  const getPrice = (minPrice: number, maxPrice: number) => {
    if (minPrice === maxPrice) {
      return `${minPrice} тг`;
    }

    return `${minPrice}  тг - ${maxPrice} тг`;
  };
  const min = procedures.reduce((a, b) => a + b.minPrice * b.quantity, 0.00);
  const max = procedures.reduce((a, b) => a + b.maxPrice * b.quantity, 0.00);

  return (

    <Box sx={{ padding: '3vh' }}>
      {procedures.map((item) => (
        <Box
          sx={{ display: 'flex', flexDirection: 'column', borderTop: '1px dotted black' }}
          key={item.id}
        >
          <Typography variant="subtitle2">
            {item.name}
          </Typography>

          <Typography variant="caption">
            Количество:
            {' '}
            {item.quantity}
          </Typography>

          <Typography variant="caption">
            Цена за услугу:
            {' '}
            {getPrice(item.minPrice, item.maxPrice)}
          </Typography>
        </Box>
      ))}
      <Box sx={{ display: 'flex', flexDirection: 'column', borderTop: '1px dotted black' }}>
        <Typography variant="caption">
          Итого:
          {' '}
          {min}
          -
          {max}
        </Typography>
      </Box>
    </Box>
  );
}
