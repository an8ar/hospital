import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Card, Typography, Stack, Button, Box,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  addToCart, removeProcedure, decrementCount,
} from '../../../cart/cartSlice';
import type { CartProcedure } from '../../../cart/types';
import { Procedure } from '../../types';
// ----------------------------------------------------------------------

type Props = {
  product: Procedure;
};

export default function ShopProductCard({ product }: Props) {
  const cartProcedures = useAppSelector((state) => state.cartSlice.procedures);

  const dispatch = useAppDispatch();

  function handleAdd(procedure: Procedure) {
    const cart: CartProcedure = {
      ...procedure,
      quantity: 1,
    };
    dispatch(addToCart(cart));
  }
  function handleRemove(procedure: Procedure) {
    const cart: CartProcedure = {
      ...procedure,
      quantity: 1,
    };
    dispatch(removeProcedure(cart));
  }
  function handleDecrement(procedure: Procedure, count: number) {
    const cart: CartProcedure = {
      ...procedure,
      quantity: count,
    };
    dispatch(decrementCount(cart));
  }
  const index = cartProcedures.findIndex((item) => item.id === product.id);// index of procedure in state that is printed
  return (
    <Card sx={{ margin: 5 }}>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {product.name}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="column" spacing={0.5}>
            <Typography
              component="span"
              sx={{ color: 'text.disabled' }}
            >
              3000tg
            </Typography>

            {cartProcedures.some((procedure) => procedure.id === product.id) ? (
              <>
                <Button onClick={() => handleRemove(product)}>
                  Удалить
                </Button>
                <Box sx={{ display: 'flex' }}>
                  <Button onClick={() => handleAdd(product)}>
                    <AddIcon />
                  </Button>
                  <Typography>
                    {cartProcedures[index].quantity}
                  </Typography>
                  <Button onClick={() => handleDecrement(product, cartProcedures[index].quantity)}>
                    <RemoveIcon />
                  </Button>
                </Box>
              </>
            ) : (
              <Button onClick={() => handleAdd(product)}>
                Добавить
              </Button>
            ) }
            <Typography component="span">
              {product.description}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
