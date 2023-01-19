import * as React from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

const steps = ['Заполните заявку', 'Подтвердить номер телефона'];
type PropsStepper = {
    activeStep: number
}

export default function FormStepper({ activeStep }: PropsStepper) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

    </Box>
  );
}
