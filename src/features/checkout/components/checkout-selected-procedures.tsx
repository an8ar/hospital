import React from 'react';

import {
  Chip, TextField, Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~/store';

import { removeProcedure } from '../../cart/cart-slice';

export function CheckoutSelectedProcedures() {
  const dispatch = useAppDispatch();
  const { selectedProcedures } = useAppSelector((state) => state.cartSlice);
  return (
    <TextField
      multiline
      InputProps={{
        startAdornment: (
          <Stack spacing={1}>
            {selectedProcedures.length > 0
              ? selectedProcedures.map((selected) => (
                <Chip
                  key={selected.id}
                  // eslint-disable-next-line no-useless-concat
                  label={`${selected.name} -` + ` от ${selected.minPrice} тг`}
                  onDelete={() => dispatch(removeProcedure({ ...selected, quantity: 0 }))}
                />
              ))
              : (
                <Chip
                  label={(
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      Выберите процедуру чтобы отправить заявку
                    </Link>
)}
                />
              )}
          </Stack>
        ),
      }}
      disabled
    />
  );
}
