import React from 'react';

import { Typography, styled, Box } from '@mui/material';

import { Procedure } from '../types';
import { ProceduresList } from './procedure-list';

type ProceduresProps={
  procedures: Procedure[]
}
export function Procedures({ procedures }:ProceduresProps) {
  return (
    <Box>
      <Typography variant="h6" align="center">Выберите услуги</Typography>
      <BoxStyle>
        <ProceduresList procedures={procedures} />
      </BoxStyle>
    </Box>
  );
}
const BoxStyle = styled(Box)(({ theme }) => (
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up(768)]: {
      display: 'flex',
      flexDirection: 'colunn',
    },
  }
));
