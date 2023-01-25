import React from 'react';

import {
  Box, Chip, Stack, styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~/store';

import { removeProcedure } from '../../cart/cart-slice';

export function CheckoutSelectedProcedures() {
  const dispatch = useAppDispatch();
  const { selectedProcedures } = useAppSelector((state) => state.cartSlice);
  return (
    <BoxStyle>
      <StackStyle
        spacing={1}
      >
        {selectedProcedures.length > 0 ? (
          selectedProcedures.map((selected) => (
            <ChipStyle
              key={selected.id}
              // eslint-disable-next-line no-useless-concat
              label={`${selected.name} -` + ` от ${selected.minPrice} тг`}
              onDelete={() => dispatch(removeProcedure({ ...selected, quantity: 0 }))}
            />
          ))
        ) : (
          <ChipStyle
            label={(
              <Link to="/" style={{ textDecoration: 'none' }}>
                Выберите процедуру чтобы отправить заявку
              </Link>
            )}
            sx={{ maxWidth: '100%', border: 1 }}
          />
        )}
      </StackStyle>
    </BoxStyle>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  maxHeight: 121,
  overflowY: 'auto',
}));
const StackStyle = styled(Stack)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(5),
}));
const ChipStyle = styled(Chip)(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: '4px',
}));
