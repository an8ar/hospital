import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Card, Typography, Stack, Button, Box,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../store';
import { addToCart, removeProcedure } from '../../../cart/cartSlice';
import type { CartProcedure } from '../../../cart/types';
import { Procedure } from '../../types';
// ----------------------------------------------------------------------

type Props = {
  product: Procedure;
};

export default function ShopProductCard({ product }: Props) {
  const selected = useAppSelector((state) => state.cartSlice.cart);
  let isAdded = false;
  let numberOfInjections = 0;
  selected.forEach((procedureCart) => {
    if (procedureCart.id === product.id) {
      isAdded = true;
      numberOfInjections = procedureCart.quantity;
    }
  });
  const dispatch = useAppDispatch();

  const [count, setCount] = React.useState(numberOfInjections);
  function handleAdd(procedure: Procedure) {
    const cart: CartProcedure = {
      ...procedure,
      quantity: count,
    };
    dispatch(addToCart(cart));
  }
  function handleRemove(procedure: Procedure) {
    const cart: CartProcedure = {
      ...procedure,
      quantity: count,
    };
    setCount(0);
    dispatch(removeProcedure(cart));
  }
  function handleCountPlus() {
    setCount(count + 1);
  }
  function handleCountMinus() {
    if (count >= 1) {
      setCount(count - 1);
    }
  }

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
            <Box sx={{ display: 'flex' }}>
              <Button onClick={() => handleCountPlus()}>
                <AddIcon />
              </Button>
              <Typography>
                {count}
              </Typography>

              <Button onClick={() => handleCountMinus()}>
                <RemoveIcon />
              </Button>
            </Box>
            {isAdded ? (
              <Button onClick={() => handleRemove(product)}>
                Удалить
              </Button>
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
