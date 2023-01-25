import React from 'react';

import { Box, Typography } from '@mui/material';

import procedureApi from '~/api/procedures/api';

import { ProcedureList } from './procedure-list';

export function Procedures() {
  const { data, isLoading } = procedureApi.endpoints.getProcedures.useQuery(null);
  if (isLoading) return (<>Идет загрузка...</>);
  const procedures = data || [];

  return (
    <Box sx={{ flex: 5 }}>
      <Typography
        textAlign="center"
        fontSize="20px"
        py="10px"
      >
        Выберите услуги
      </Typography>
      <ProcedureList products={procedures} />
    </Box>
  );
}
