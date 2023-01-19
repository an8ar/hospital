import React, { useState } from 'react';

import { Container, Stack } from '@mui/material';

import { CreateProcedureRequest } from '~/api/procedures/types';

import { CheckoutFormInfo } from './checkout-form-info';
import { CheckoutFormVerification } from './checkout-form-verification';
import FormStepper from './form-stepper';

export function CheckoutForm() {
  const [step, setStep] = useState(0);
  const [submit, setSubmit] = useState<CreateProcedureRequest>({
    verificationId: '',
    procedures: [],
    description: 'none',
    cityId: 0,
    firstName: '',
    lastName: '',
    address: '',
  });
  return (
    <Container>
      <Stack spacing={5}>
        <FormStepper activeStep={step} />
        {step === 0 && <CheckoutFormInfo setStep={setStep} setSubmit={setSubmit} />}
        {step === 1 && <CheckoutFormVerification setStep={setStep} submit={submit} />}
      </Stack>
    </Container>
  );
}
