import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import procedureApi from '~/api/procedures/api';
import userApi from '~/api/user/api';
import { FormProvider } from '~/components/hook-form';
import { removeAll } from '~/features/cart';
import { useAppDispatch, useAppSelector } from '~/store';

import { CheckoutFormInfo } from './checkout-form-info';
import { CheckoutFormVerification } from './checkout-form-verification';
import FormStepper from './form-stepper';

const UserDetailSchema = Yup.object().shape({
  firstName: Yup.string().required('Введите имя полнотью'),
  lastName: Yup.string().required('Введите фамилию полнотью'),
  address: Yup.string().required('Введите адрес полнотью'),
  phone: Yup.string().required('Введите номер телефона полнотью'),
  cityId: Yup.number().required('Выберите город'),
  description: Yup.string(),
});

const VerificationSchema = UserDetailSchema.shape({
  code: Yup.string().min(6).max(6).required('Введите код!'),
  verificationId: Yup.string(),
});

const CheckoutSchema = [
  UserDetailSchema,
  VerificationSchema,
];
const defaultValues = {
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  description: '',
  code: '',
  verificationId: '',
};

export type InformationFormValues = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  cityId: number;
  code: string;
  description: string;
};

 type VerificationFormValues = {
  code: string;
  verificationId: string;
}

export type FormValues = InformationFormValues & VerificationFormValues;

export function CheckoutForm() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const cartProcedures = useAppSelector((state) => state.cartSlice.procedures);

  const [confirmVerification] = userApi.endpoints.confirmVerification.useMutation();

  const [createProcedures] = procedureApi.endpoints.createProcedures.useMutation();

  const methods = useForm<FormValues>({
    resolver: yupResolver(CheckoutSchema[step]),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    await confirmVerification({
      code: data.code,
      verificationId: data.verificationId,
    });
    await createProcedures({
      procedures: cartProcedures.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      ...data,
    });

    dispatch(removeAll());

    enqueueSnackbar('Ваш заказ был оформлен, доктор свяжется с вами!', { variant: 'success' });

    navigate('/');
  };

  return (
    <Container>
      <Stack spacing={2}>
        <FormStepper activeStep={step} />
        <FormProvider methods={methods}>
          <Box>
            {step === 0 && (
            <CheckoutFormInfo
              setStep={setStep}
            />
            )}
            {step === 1 && (
            <CheckoutFormVerification
              setStep={setStep}
              onSubmit={onSubmit}
            />
            )}
          </Box>
        </FormProvider>
      </Stack>
    </Container>
  );
}
