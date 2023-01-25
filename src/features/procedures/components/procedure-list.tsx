import React from 'react';

import { Stack, styled } from '@mui/material';

import { Procedure } from '../types';
import { ProcedureCard } from './procedure-card';

type ProceduresProps={
  procedures: Procedure[]
}
export function ProceduresList({ procedures }:ProceduresProps) {
  return (
    <StackStyle spacing={2} sx={{ mt: 3 }}>
      {procedures.map((procedure) => (
        <ProcedureCard procedure={procedure} />
      ))}
    </StackStyle>
  );
}
const StackStyle = styled(Stack)(({ theme }) => (
  {
    borderSpacing: theme.spacing(2),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up(768)]: {
      marginTop: theme.spacing(4),
    },
  }
));
