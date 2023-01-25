import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Container, Box, styled } from '@mui/material';

import procedureApi from '~/api/procedures/api';
import { Logo } from '~/assets/logo';
import { Procedures } from '~/features/procedures';
import { useAppSelector } from '~/store';

import { CartComponentList } from './cart-procedure-list';

export function CartComponent() {
  const { selectedProcedures } = useAppSelector((state) => state.cartSlice);
  const { data: procedures = [], isLoading } = procedureApi.endpoints.getProcedures.useQuery();
  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Logo />
      </Box>
      {
        isLoading
          ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50%">
              <LoadingButton
                loading={isLoading}
                variant="contained"
                size="large"
              />
            </Box>
          )
          : (
            <BoxStyle>
              <Procedures procedures={procedures} />
              <CartComponentList selectedProcedures={selectedProcedures} />
            </BoxStyle>
          )

      }
    </Container>
  );
}
const BoxStyle = styled(Box)(({ theme }) => (
  {
    display: 'grid',
    gridTemplateColumns: '1fr',
    width: '100%',
    marginTop: theme.spacing(3),
    [theme.breakpoints.up(768)]: {
      gridTemplateColumns: '3fr 2fr',
      height: '100%',
    },
  }
));
