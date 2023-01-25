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
    fontSize: isMobile ? '11px' : '16px',
  };

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
      <Typography sx={{ ...style, fontWeight: activeStep === 0 ? 'bold' : 'none' }}>
        Заполните заявку
      </Typography>
      <KeyboardDoubleArrowRightIcon />
      <Typography sx={{ ...style, fontWeight: activeStep === 1 ? 'bold' : 'none' }}>
        Подтвердить номер телефона
      </Typography>
    </Box>
  );
}
