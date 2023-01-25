import React from 'react';

import { Stack, styled, Box } from '@mui/material';
import Chip from '@mui/material/Chip';

import { removeProcedure } from '~/features/cart';
import { Procedure } from '~/features/procedures';
import { useAppSelector, useAppDispatch } from '~/store';

const BoxStyle = styled(Box)({
  color: 'darkslategray',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #c4c4c4',
  borderRadius: '8px',
  overflow: 'scroll',
  '&:hover': {
    border: '1px solid black',
  },
  '&:active': {
    border: '2px solid #3366ff',
  },
});

export function SelectedProcedures() {
  const procedures = useAppSelector((state) => state.cartSlice.procedures);
  const dispatch = useAppDispatch();

  function handleDelete(procedure: Procedure) {
    dispatch(removeProcedure(procedure));
  }
  return (
    <BoxStyle>
      <Stack spacing={2} margin={1.5}>
        {procedures.map((item) => (
          <Chip
            label={item.name}
            key={item.id}
            onDelete={() => handleDelete(item)}
          />
        ))}
      </Stack>
    </BoxStyle>
  );
}
