import React from 'react';

import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { Logo } from '~/assets/logo';
import { APPLICATION_NAME } from '~/config';

type Props = {
  children: React.ReactNode;
  meta?: React.ReactNode;
  title: string;
};

export function Page({ children, meta, title }: Props) {
  return (
    <>
      <Helmet>
        <title>{`${title} | ${APPLICATION_NAME}`}</title>
        {meta}
      </Helmet>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Logo />
        </Box>
        {children}
      </Box>
    </>
  );
}
