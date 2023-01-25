import React from 'react';

import {
  Box, Typography, Button, styled, Stack,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import checkoutApi from '~/api/checkout/api';
import usersApi from '~/api/users/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { useResponsive } from '~/hooks/useResponsive';
import { useAppSelector } from '~/store';

import { CheckoutFormType } from '../type';
import { CheckoutSteps } from './checkout-steps';

type CheckoutVerificationProps = {
  activePage: number
}

export function CheckoutVerification({ activePage }: CheckoutVerificationProps) {
  const navigate = useNavigate();
  const [confirmVerification] = checkoutApi.endpoints.confirmVerification.useMutation();
  const [userProcedureRequest] = usersApi.endpoints.userProcedureRequest.useMutation();
  const { selectedProcedures } = useAppSelector((state) => state.cartSlice);
  const isLaptop = useResponsive('up', 'sm');
  const methods = useFormContext<CheckoutFormType>();
  const { handleSubmit, setError } = methods;

  async function onSubmit(data: CheckoutFormType) {
    const { code, phone, ...restData } = data;
    try {
      const { isVerified } = await confirmVerification({
        code,
        verificationId: data.verificationId,
      }).unwrap();
      if (isVerified) {
        const submitData = {
          ...restData,
          procedures: selectedProcedures
            .map((procedure) => ({ id: procedure.id, quantity: procedure.quantity })),
        };
        try {
          await userProcedureRequest(submitData);
          toast.success('Ваша заявка принята, мы с вами скоро свяжемся');
          setTimeout(() => {
            navigate('/');
          }, 5000);
        } catch (e: any) {
          toast.error(`${e.data.error}`);
        }
      }
    } catch (error: unknown) {
      setError('code', { type: 'afterSubmit', message: 'Неправильный или истекший код' });
    }
  }

  return (
    <FormProvider methods={methods}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CheckoutSteps activePage={activePage} />
      </Box>
      <Typography sx={{ mt: 3, fontSize: isLaptop ? '18px' : '14px' }}>
        Мы отправили код подтверждения на WhatsApp на вашем номере. Пожалуйста
        введите ero в поле для проверки номера телефона.
      </Typography>
      <BoxStyle>
        <StackStyle>
          <Typography sx={{ fontSize: isLaptop ? '18px' : '14px' }}>
            Код подтверждения:
          </Typography>
          <RHFTextField
            name="code"
            placeholder="Введите код"
            sx={{ mt: 1 }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3, pl: 12, pr: 12 }}
            onClick={handleSubmit(onSubmit)}
          >
            Подтвердить
          </Button>
        </StackStyle>
      </BoxStyle>
    </FormProvider>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: theme.spacing(2),
  [theme.breakpoints.up(768)]: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const StackStyle = styled(Stack)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up(768)]: {
    width: '30%',
  },
}));
