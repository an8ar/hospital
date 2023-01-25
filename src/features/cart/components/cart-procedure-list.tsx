import React from 'react';

import {
  Typography, Box, styled,
} from '@mui/material';

import { SelectedProcedureList } from '~/features/procedures';

import { CartProcedures } from '../types';

export function CardProcedureList({ selectedProcedures }: CartProcedures) {
  const isCartEmpty = selectedProcedures.length === 0;
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
