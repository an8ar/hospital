import React from 'react';

import {
  Typography, Box, IconButton, Button, Stack, styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';
import { useAppDispatch } from '~/store';

import { removeProcedure } from '../cart-slice';
import { CartProcedure } from '../types';

type CartComponentListProps = {
  selectedProcedures: CartProcedure[]
}
export function CartComponentList({ selectedProcedures }: CartComponentListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        bgcolor: '#F8F8F8', boxShadow: 12, height: '100%', width: '100%',
      }}
    >
      <Typography variant="h6" align="center">
        Корзина
      </Typography>
      {
        selectedProcedures.length > 0
          ? (
            <BoxStyle
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
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
                    <IconButton>
                      <Iconify
                        icon="mdi:remove-circle"
                        onClick={() => dispatch(removeProcedure({ ...procedure, quantity: 0 }))}
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
          )
          : <Typography align="center" variant="h6">Ваша корзина пуста</Typography>
    }
    </Box>
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
