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

  const firstStep = {
    fontWeight: 'none',
  };

  const secondStep = {
    fontWeight: 'none',
  };

  if (!isMobile) {
    style.fontSize = '16px';
  }

  if (activeStep === 0) {
    firstStep.fontWeight = 'bold';
  } else {
    secondStep.fontWeight = 'bold';
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: '#CCF0FF',
      padding: '3px 9px',
      borderRadius: '30px',

    }}
    >
      <Typography sx={{ ...style, ...firstStep }}>Заполните заявку</Typography>
      <KeyboardDoubleArrowRightIcon />
      <Typography sx={{ ...style, ...secondStep }}>Подтвердить номер телефона</Typography>
    </Box>
  );
}
