import React from 'react';

import {
  Grid, Card, Button, CardHeader, Typography, Dialog, Box, styled,
} from '@mui/material';
import sum from 'lodash/sum';

import { BottomDrawer } from '~/components/bottom-drawer';
import EmptyContent from '~/components/EmptyContent';
import Scrollbar from '~/components/Scrollbar';
import { Procedure } from '~/features/procedures';
import { useResponsive } from '~/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '~/store';

import {
  addToCart, removeProcedure, decrementQuantity,
} from '../cart-slice';
import { CartProcedureList } from './cart-procedure-list';
import { CartSubmit } from './cart-submit';

// ----------------------------------------------------------------------

export function CartCheckout() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cartSlice.procedures);

  const totalItems = sum(cart.map((item) => item.quantity));
  const isPhone = useResponsive('down', 'sm');

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

  const [open, setOpen] = React.useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const cartActionProps = {
    open,
    onClose: handleCloseModal,
    onOpen: handleOpenModal,
  };

  return (
    <>
      <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={12} sm container>
          <Card sx={{ minWidth: '100%' }}>
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
            />

            {!isEmptyCart ? (
              <Scrollbar>
                <CartProcedureList
                  procedures={cart}
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

        <Grid item xs={1}>
          <Button
            size="small"
            type="submit"
            variant="contained"
            disabled={cart.length === 0}
            onClick={handleOpenModal}
          >
            Оформить заказ
          </Button>
        </Grid>
      </Grid>
      {!isPhone && <CartModal {...cartActionProps} />}
      {isPhone && <CartDrawer {...cartActionProps} />}
    </>
  );
}

type CartActionModalProps = {
  onClose: VoidFunction;
  open: boolean;
};
function CartModal({
  open, onClose,
}: CartActionModalProps) {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
    >
      <CartSubmit />
    </Dialog>
  );
}
function CartDrawer({
  open, onClose,
}: CartActionModalProps) {
  return (
    <BottomDrawerStyle
      open={open}
      onClose={onClose}
    >
      <Box>
        <CartSubmit />
      </Box>
    </BottomDrawerStyle>
  );
}
const BottomDrawerStyle = styled(BottomDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    height: `calc(70% - ${theme.spacing(4)})`,
  },
}));
