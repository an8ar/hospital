import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Container, Box, styled } from '@mui/material';

import procedureApi from '~/api/procedures/api';
import { Logo } from '~/assets/logo';
import { Procedures } from '~/features/procedures';
import { useAppSelector } from '~/store';

import { CardProcedureList } from './cart-procedure-list';

export function CartComponent() {
  const { data: procedures = [], isLoading } = procedureApi.endpoints.getProcedures.useQuery();
  const { selectedProcedures } = useAppSelector((state) => state.cartSlice);
  return (
    <ContainerStyle>
      <CenteredBoxStyle>
        <Logo />
      </CenteredBoxStyle>
      {
        isLoading
          ? (
            <BoxButtonStyle>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                size="large"
              />
            </BoxButtonStyle>
          )
          : (
            <BoxStyle>
              <Procedures procedures={procedures} />
              <CardProcedureList cartProcedures={selectedProcedures} />
            </BoxStyle>
          )

      }
    </ContainerStyle>
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
const ContainerStyle = styled(Container)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
}
));
const CenteredBoxStyle = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
));
const BoxButtonStyle = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
}
));
