import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Stack, Alert, Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import procedureApi from '~/api/procedures/api';
import { CreateProcedureRequest } from '~/api/procedures/types';
import userApi from '~/api/user/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { removeAll } from '~/features/cart';
import { useAppDispatch } from '~/store';

type FormValuesProps = {
  code: string
  afterSubmit?: string
};

type VerificationProps = {
    setStep: (n: number)=>void,
    submit: CreateProcedureRequest
}

export function CheckoutFormVerification({ setStep, submit }:VerificationProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmVerification] = userApi.endpoints.confirmVerification.useMutation();
  const [createProcedures] = procedureApi.endpoints.createProcedures.useMutation();
  const CheckoutSchema = Yup.object().shape({
    code: Yup.string().required('Введите код подтверждения').min(6, 'Минимум 6 цифр'),

  });

  const defaultValues:FormValuesProps = {
    code: '',
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CheckoutSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    await confirmVerification({
      verificationId: submit.verificationId,
      code: data.code,
    });
    await createProcedures(submit);
    dispatch(removeAll());
    enqueueSnackbar('Ваш заказ был оформлен, доктор свяжется с вами!', { variant: 'success' });
    navigate('/');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField
          name="code"
          label="Введите код подтвержения"
          type="tel"
        />
        <Button variant="text" onClick={() => setStep(0)}>Назад</Button>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Отправить заявку
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
