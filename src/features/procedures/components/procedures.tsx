import React from 'react';

import { Box, Typography } from '@mui/material';

import procedureApi from '~/api/procedures/api';

import { NewList } from './list';

export function Procedures() {
  const { data, isLoading } = procedureApi.endpoints.getProcedures.useQuery(null);
  if (isLoading) return (<>Идет загрузка...</>);
  const procedures = data || [];

  return (
    <Box sx={{ flex: 5 }}>
      <Typography
        textAlign="center"
      >
        Выберите услуги
      </Typography>
      <NewList products={procedures} />
    </Box>
  );
}
