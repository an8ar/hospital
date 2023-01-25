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
        <IconButton>
          {
            !isSelected
              ? (
                <Iconify
                  icon="material-symbols:add-circle"
                  onClick={() => {
                    dispatch(addProcedure({ ...procedure, quantity: 1 }));
                  }}
                  width={22}
                  height={22}
                  color="blue"
                />
              )
              : (
                <Iconify
                  icon="mdi:check-circle"
                  onClick={() => {
                    dispatch(removeProcedure({ ...procedure, quantity: 0 }));
                  }}
                  width={22}
                  height={22}
                  color="green"
                />
              )
          }
        </IconButton>
      </Box>
      <Divider />
    </>
  );
}
