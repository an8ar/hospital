import React from 'react';

import {
  Typography, Box, styled,
} from '@mui/material';

import { SelectedProcedureList } from '~/features/procedures';

import { CartProcedure } from '../types';

type CartProcedures = {
  cartProcedures: CartProcedure[]
}

export function CardProcedureList({ cartProcedures }: CartProcedures) {
  const isCartEmpty = cartProcedures.length === 0;
  return (
    <BoxStyle>
      <Typography variant="h6" align="center">
        Корзина
      </Typography>
      {
        !isCartEmpty
          ? (
            <SelectedProcedureList />
          )
          : <Typography align="center" variant="h6">Ваша корзина пуста</Typography>
    }
    </BoxStyle>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#F8F8F8',
  height: '100%',
  width: '100%',
  boxShadow: theme.shadows[3],
}));
