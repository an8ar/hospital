import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container, Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Logo } from '~/assets/logo';
import { FormProvider } from '~/components/hook-form';

import { CheckoutFormType } from '../type';
import { CheckoutFormInfo } from './checkout-form';
import { CheckoutSteps } from './checkout-steps';
import { CheckoutVerification } from './checkout-verification';

export function Checkout() {
  const [activePage, setActivePage] = useState(0);

  const userDetailsSchema = yup.object({
    firstName: yup.string().required('Обязательное поле'),
    lastName: yup.string().required('Обязательное поле'),
    address: yup.string().required('Обязательное поле'),
    cityId: yup.number().required('Обязательное поле'),
    phone: yup.string().required('Обязательное поле'),
    description: yup.string().required('Обязательное поле'),
  });

  const verificationSchema = userDetailsSchema.shape({
    code: yup.string()
      .min(6, 'Код состоит из 6 цифр').matches(/^[0-9]+$/, 'Must be only digits')
      .max(6, 'Код состоит из 6 цифр')
      .required('Это обязательное поле'),
    verificationId: yup.string().required(),
  });

  const checkoutSchema = [userDetailsSchema, verificationSchema];
  const methods = useForm<CheckoutFormType>({
    resolver: yupResolver(checkoutSchema[activePage]),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      description: '',
      code: '',
      verificationId: '',
    },
  });

  return (
    <Container>
      <FormProvider methods={methods}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Logo />
        </Box>
        {activePage === 0
          ? (
            <>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <CheckoutSteps activePage={activePage} />
              </Box>
              <CheckoutFormInfo setActivePage={setActivePage} />
            </>
          )
          : <CheckoutVerification activePage={activePage} />}
      </FormProvider>
    </Container>
  );
}
