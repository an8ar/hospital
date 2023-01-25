import React from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Stack, Button,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { RHFTextField } from '~/components/hook-form';

import { FormValues } from './checkout-form';

type Props = {
    setStep: (n: number)=>void,
    onSubmit: (data:FormValues)=> void
}
export function CheckoutFormVerification({ setStep, onSubmit }:Props) {
  const methods = useFormContext<FormValues>();

  const { handleSubmit, formState: { isSubmitting } } = methods;

  return (
    <Stack spacing={3}>
      <RHFTextField
        name="code"
        label="Введите код подтвержения"
        type="tel"
      />
      <Button variant="text" onClick={() => setStep(0)}>Назад</Button>
      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        loading={isSubmitting}
      >
        Отправить заявку
      </LoadingButton>
    </Stack>
  );
}
