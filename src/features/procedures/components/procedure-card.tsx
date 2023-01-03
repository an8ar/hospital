import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Card, Typography, Stack, Button, Box,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  addToCart, removeProcedure, decrementQuantity,
} from '../../cart/cart-slice';
import { Procedure } from '../types';
// ----------------------------------------------------------------------

type Props = {
  product: Procedure;
};

export default function ShopProductCard({ product }: Props) {
  const cartProcedures = useAppSelector((state) => state.cartSlice.procedures);

  const dispatch = useAppDispatch();

  const cartProcedure = cartProcedures.find((item) => item.id === product.id);
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
              {product.minPrice === product.maxPrice ? (
                <Typography>
                  {' '}
                  {product.maxPrice}
                </Typography>
              )
                : (
                  <Typography>
                    {product.minPrice}
                    {' '}
                    тг
                    {' '}
                    -
                    {' '}
                    {product.maxPrice}
                    {' '}
                    тг
                  </Typography>
                )}
            </Typography>
            {cartProcedure ? (
              <>
                <Button onClick={() => dispatch(removeProcedure(product))}>
                  Удалить
                </Button>
                <Box sx={{ display: 'flex' }}>
                  <Button onClick={() => dispatch(addToCart(product))}>
                    <AddIcon />
                  </Button>
                  <Typography>
                    {cartProcedure.quantity}
                  </Typography>
                  <Button onClick={() => dispatch(decrementQuantity(product))}>
                    <RemoveIcon />
                  </Button>
                </Box>
              </>
            ) : (
              <Button onClick={() => dispatch(addToCart(product))}>
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
