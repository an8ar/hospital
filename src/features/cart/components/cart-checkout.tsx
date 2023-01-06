import React from 'react';

import {
  Grid, Card, Button, CardHeader, Typography, Modal, Box,
} from '@mui/material';
import sum from 'lodash/sum';

// @mui
// redux
import EmptyContent from '~/components/EmptyContent';
import Scrollbar from '~/components/Scrollbar';
import { Procedure } from '~/features/procedures';
import { useAppDispatch, useAppSelector } from '~/store';

import {
  addToCart, removeProcedure, decrementQuantity,
} from '../cart-slice';
// routes
// components
//
import { CartProcedureList } from './cart-procedure-list';
import { CartSubmit } from './cart-submit';

// ----------------------------------------------------------------------

export function CartCheckout() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cartSlice.procedures);

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (procedure: Procedure) => {
    dispatch(removeProcedure(procedure));
  };

  const handleIncreaseQuantity = (procedure: Procedure) => {
    dispatch(addToCart(procedure));
  };

  const handleDecreaseQuantity = (procedure: Procedure) => {
    dispatch(decrementQuantity(procedure));
  };

  const gridStyle = {
    display: 'flex', flexDirection: 'column',
  };

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Grid container spacing={3} sx={{ ...gridStyle }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title={(
                <Typography variant="h6">
                  Корзина
                  <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;(
                    {totalItems}
                    )
                  </Typography>
                </Typography>
            )}
              sx={{ mb: 3 }}
            />

            {!isEmptyCart ? (
              <Scrollbar>
                <CartProcedureList
                  procedure={cart}
                  onDelete={handleDeleteCart}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                />
              </Scrollbar>
            ) : (
              <EmptyContent
                title="Корзина пустая"
                description="Похоже что вы не выбрали процедуры, выберите подходещие процедуры"
              />
            )}
          </Card>
        </Grid>

        <Grid item xs={1} md={2}>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={cart.length === 0}
            onClick={() => setOpen(true)}
          >
            Оформить заказ
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box>
          <CartSubmit />
        </Box>
      </Modal>
    </>
  );
}
