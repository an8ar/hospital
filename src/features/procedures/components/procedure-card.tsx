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

type Props = {
  product: Procedure;
};

export function ProcedureCard({ product }: Props) {
  const cartProcedures = useAppSelector((state) => state.cartSlice.procedures);

  const dispatch = useAppDispatch();

  const cartProcedure = cartProcedures.find((item) => item.id === product.id);

  const getPrice = () => {
    const { minPrice, maxPrice } = product;

    if (minPrice === maxPrice) {
      return `${minPrice} тг`;
    }

    return `${minPrice}  тг - ${maxPrice} тг`;
  };

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle1" noWrap>
          {product.name}
        </Typography>
        <Typography variant="subtitle2" component="span">
          {product.description}
        </Typography>
        <Stack direction="column" spacing={0.5} alignItems="center">
          <Typography
            component="span"
          >
            {getPrice()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {cartProcedure ? (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                <Button onClick={() => dispatch(removeProcedure(product))}>
                  Удалить
                </Button>
              </Box>
            ) : (
              <Button onClick={() => dispatch(addToCart(product))}>
                Добавить
              </Button>
            ) }
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
