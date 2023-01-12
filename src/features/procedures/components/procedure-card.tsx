import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Card, Typography, Button, Box,
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
    <Card variant="outlined" sx={{ p: 3, marginBottom: 3, mx: '2px' }}>

      <Box>
        <Typography variant="subtitle1" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" component="span">
          {product.description}
        </Typography>
      </Box>

      <Box>
        <Typography
          component="span"
          variant="subtitle2"
        >
          Цена:
          {' '}
          {getPrice()}
        </Typography>

        <Box sx={{
          flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        }}
        >
          {cartProcedure ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => dispatch(addToCart(product))}>
                  <AddIcon fontSize="small" />
                </Button>
                <Typography>
                  {cartProcedure.quantity}
                </Typography>
                <Button onClick={() => dispatch(decrementQuantity(product))}>
                  <RemoveIcon fontSize="small" />
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
      </Box>
    </Card>
  );
}
