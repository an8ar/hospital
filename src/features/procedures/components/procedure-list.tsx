import * as React from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  ListItemText, ListItem, IconButton, Stack, Divider, Box,
} from '@mui/material';
import List from '@mui/material/List';
import { useSnackbar } from 'notistack';

import { addToCart } from '~/features/cart';
import { useAppSelector, useAppDispatch } from '~/store';

import { Procedure } from '../types';

// ----------------------------------------------------------------------

type Props = {
  products: Procedure[];
};
export function ProcedureList({ products }: Props) {
  const cart = useAppSelector((state) => state.cartSlice.procedures);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  function handleAddProcedure(procedure: Procedure) {
    if (cart.some((item) => item.id === procedure.id)) {
      enqueueSnackbar('Вы уже добавили процедуру', { variant: 'success' });
    } else {
      dispatch(addToCart(procedure));
    }
  }

  return (
    <List>
      <Stack spacing={1}>
        {products.map((procedure) => {
          const labelId = `checkbox-list-label-${procedure.name}`;

          return (
            <Box key={procedure.id}>
              <ListItem
                key={procedure.slug}
                secondaryAction={(
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    value={procedure.id}
                    onClick={() => handleAddProcedure(procedure)}
                  >
                    {cart.some((element) => element.id === procedure.id)
                      ? <CheckCircleIcon color="success" />
                      : <AddCircleIcon color="primary" /> }
                  </IconButton>
            )}
              >
                <ListItemText
                  id={labelId}
                  primary={`${procedure.name} от - ${procedure.maxPrice} тг`}
                />
              </ListItem>
              {products[products.length - 1].id !== procedure.id && (<Divider />)}
            </Box>

          );
        })}
      </Stack>
    </List>
  );
}
