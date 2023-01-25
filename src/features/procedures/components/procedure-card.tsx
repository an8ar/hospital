import React from 'react';

import {
  Divider, Typography, IconButton, Box,
} from '@mui/material';

import { Iconify } from '~/components/Iconify';
import { addProcedure, removeProcedure } from '~/features/cart';
import { useAppDispatch, useAppSelector } from '~/store';

import { Procedure } from '../types';

type ProcedureCardProps = {
  procedure: Procedure
}
export function ProcedureCard({ procedure }: ProcedureCardProps) {
  const { selectedProcedures } = useAppSelector((state) => state.cartSlice);

  const isSelected = selectedProcedures
    .some((selectedProcedure) => selectedProcedure.id === procedure.id);
  const dispatch = useAppDispatch();
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography sx={{ flexGrow: 1 }}>
          {procedure.name}
          - от
          {' '}
          {procedure.minPrice}
          {' '}
          тг
        </Typography>
        {
        !isSelected
          ? (
            <IconButton
              onClick={() => {
                dispatch(addProcedure({ ...procedure, quantity: 1 }));
              }}
            >
              <Iconify
                icon="material-symbols:add-circle"
                width={22}
                height={22}
                color="blue"
              />
            </IconButton>
          )
          : (
            <IconButton
              onClick={() => {
                dispatch(removeProcedure({ ...procedure, quantity: 0 }));
              }}
            >
              <Iconify
                icon="mdi:check-circle"
                width={22}
                height={22}
                color="green"
              />
            </IconButton>
          )
      }
      </Box>
      <Divider />
    </>
  );
}
