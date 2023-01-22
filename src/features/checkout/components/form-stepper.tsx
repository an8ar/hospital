import * as React from 'react';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { useResponsive } from '~/hooks/useResponsive';

type PropsStepper = {
    activeStep: number
}

export default function FormStepper({ activeStep }: PropsStepper) {
  const isMobile = useResponsive('down', 'sm');

  const style = {
    fontSize: '11px',
  };
  if (!isMobile) {
    style.fontSize = '16px';
  }

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      {activeStep === 0 && (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#CCF0FF',
        padding: '3px 9px',
        borderRadius: '30px',
      }}
      >
        <Typography sx={{ ...style }} fontWeight="bold">Заполните заявку</Typography>
        <KeyboardDoubleArrowRightIcon />
        <Typography sx={{ ...style }}>Подтвердить номер телефона</Typography>
      </Box>
      )}
      {activeStep === 1 && (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#CCF0FF',
        borderRadius: '30px',
      }}
      >
        <Typography sx={{ ...style }}>Заполните заявку</Typography>
        <KeyboardDoubleArrowRightIcon />
        <Typography sx={{ ...style }} fontWeight="bold">Подтвердить номер телефона</Typography>
      </Box>
      )}
    </Box>
  );
}
