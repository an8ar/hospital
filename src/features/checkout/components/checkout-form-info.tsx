import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Stack, Alert, Typography, Box,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import cityApi from '~/api/city';
import { CreateProcedureRequest } from '~/api/procedures/types';
import userApi from '~/api/user/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';
import { RHFSelect } from '~/components/hook-form/RHFSelect';
import { useAppSelector } from '~/store';

import { SelectedProcedures } from './selected-procedures';

type FormValuesProps = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  cityId: number;
  description: string;
  afterSubmit?: string;
};
interface InfoProps{
  setStep: (n: number)=>void,
  setSubmit: (procedure: CreateProcedureRequest)=>void
} const CheckoutSchema = Yup.object().shape({
  firstName: Yup.string().required('Введите имя полнотью'),
  lastName: Yup.string().required('Введите фамилию полнотью'),
  address: Yup.string().required('Введите адрес полнотью'),
  phone: Yup.string().required('Введите номер телефона полнотью'),
  cityId: Yup.number().required('Выберите город').max(1),
  description: Yup.string(),

});
const defaultValues:FormValuesProps = {
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  cityId: 1,
  description: '',
};

export function CheckoutFormInfo({ setStep, setSubmit }:InfoProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [sendVerification] = userApi.endpoints.sendVerification.useMutation();
  const cart = useAppSelector((state) => state.cartSlice.procedures);

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
    setStep(1);
    const responce = await sendVerification({ countryCode: 'KZ', phone: data.phone }).unwrap();
    setSubmit({
      ...data,
      verificationId: responce.verificationId,
      procedures: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
    });
    enqueueSnackbar('На ваш WhatsApp был отправлен код', { variant: 'warning' });
  };

  const { data: fetchedCities, isLoading } = cityApi.endpoints.getCities.useQuery(null);
  if (isLoading) return (<>Идет загрузка...</>);
  const cities = fetchedCities || [];
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
      }}
      >
        <Stack minWidth="300px" spacing={1}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <Typography marginBottom={1}> Имя</Typography>
          <RHFTextField
            name="firstName"
            label="Введите имя"
          />
          <Typography marginBottom={1}> Фамилия</Typography>
          <RHFTextField
            name="lastName"
            label="Введите фамилию"
          />
          <Typography marginBottom={1}> Адрес</Typography>
          <RHFTextField
            name="address"
            label="Введите полный адрес"
          />
          <Typography marginBottom={1}> Город</Typography>
          <RHFSelect
            name="cityId"
            label="Выберите ваш город"
          >
            {cities.map((city) => (
              <option key={city.slug} value={city.id}>
                {city.name}
              </option>
            ))}

          </RHFSelect>
          <Typography marginBottom={1}>Номер</Typography>
          <RHFPhoneField
            name="phone"
            label="Номер телефона (WhatsApp)"
            type="tel"
          />

        </Stack>
        <Stack minWidth="300px" spacing={1}>
          <Typography marginBottom={1}> Дополнительная информация</Typography>
          <RHFTextField
            name="description"
            label="Введите дополнительную информацию"
          />
          <Typography marginBottom={1}> Выбранные услуги</Typography>
          <SelectedProcedures />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Отправить заявку
          </LoadingButton>
        </Stack>

      </Box>

    </FormProvider>
  );
}
