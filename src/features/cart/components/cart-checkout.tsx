import React from 'react';

import {
  Box, Typography, Button, Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import EmptyContent from '~/components/EmptyContent';
import { useAppSelector } from '~/store';

import { CartList } from './list';
// ----------------------------------------------------------------------

export function CartCheckout() {
  const cart = useAppSelector((state) => state.cartSlice.procedures);
  const isEmptyCart = cart.length === 0;
  const navigate = useNavigate();

  return (
    <Box sx={{
      flex: 3,
    }}
    >
      {isEmptyCart ? (
        <Container sx={{ minWidth: '100%' }}>
          <EmptyContent
            title="Корзина пустая"
            description="Похоже что вы не выбрали процедуры, выберите подходещие процедуры"
          />
        </Container>
      )
        : (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: '100%',
          }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                textAlign="center"
              >
                Корзина
              </Typography>
              <CartList />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                size="small"
                variant="contained"
                disabled={cart.length === 0}
                onClick={() => navigate('/submit')}
              >
                Перейти к оформлению
              </Button>
            </Box>
          </Box>
        )}

    </Box>
  );
}
