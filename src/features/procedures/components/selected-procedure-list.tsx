import React from 'react';

import {
  Stack, Box, Typography, IconButton, Button, styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';
import { removeProcedure } from '~/features/cart';
import { useAppDispatch, useAppSelector } from '~/store';

export function SelectedProcedureList() {
  const { selectedProcedures } = useAppSelector((state) => state.cartSlice);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  return (
    <BoxStyle>
      <Stack spacing={4} sx={{ flexGrow: 1 }}>
        {selectedProcedures.map((procedure) => (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>
              {procedure.name}
              {' '}
              - от
              {' '}
              {procedure.minPrice}
              {' '}
              тг
            </Typography>
            <IconButton
              onClick={() => dispatch(removeProcedure({ ...procedure, quantity: 0 }))}
            >
              <Iconify
                icon="mdi:remove-circle"
                width={24}
                height={24}
                color="red"
              />
            </IconButton>
          </Box>
        ))}
      </Stack>
      <ButtonStyle>
        <Button color="info" variant="contained" onClick={() => navigate('/checkout')}>
          Перейти к оформлению
        </Button>
      </ButtonStyle>
    </BoxStyle>
  );
}
const BoxStyle = styled(Box)(({ theme }) => (
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up(768)]: {
      marginTop: theme.spacing(4),
    },
  }));
const ButtonStyle = styled(Box)(({ theme }) => (
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up(768)]: {
      marginBottom: theme.spacing(10),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
  }
));
