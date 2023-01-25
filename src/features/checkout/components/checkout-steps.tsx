import React from 'react';

import { Typography, Box } from '@mui/material';

import { useResponsive } from '~/hooks/useResponsive';

type ShowStepsProps = {
  activePage: number
}
export function CheckoutSteps({ activePage }: ShowStepsProps) {
  const steps = ['Заполнить заявку', 'Подтвердить номер телефона'];
  const isLaptop = useResponsive('up', 'sm');
  return (
    <Box
      display="inline-flex"
      sx={{
        bgcolor: '#CCF0FF', borderRadius: '20px', mt: 4, padding: '0 6px',
      }}
    >
      {steps.map((step, index) => (
        <>
          <Typography
            align="center"
            sx={{
              color: (index === activePage) ? 'black' : 'grey.500',
              fontSize: (isLaptop) ? '18px' : '12px',
              fontWeight: 'bold',
            }}
          >
            {step}
          </Typography>
          {index + 1 !== steps.length
              && (
              <Typography
                sx={{
                  fontSize: (isLaptop) ? '18px' : '12px',
                  mx: 2,
                }}
              >
                {'>>'}
              </Typography>
              )}
        </>
      ))}
    </Box>
  );
}
