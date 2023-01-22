import React from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Stack, Typography, Box,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useFormContext } from 'react-hook-form';

import cityApi from '~/api/city/city';
import userApi from '~/api/user/api';
import { RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';
import { RHFSelect } from '~/components/hook-form/RHFSelect';

import { FormValues, InformationFormValues } from './checkout-form';
import { SelectedProcedures } from './selected-procedures';

interface Props{
  setStep: (step:number)=>void,
}

export function CheckoutFormInfo({ setStep }:Props) {
  const {
    handleSubmit, setValue,
  } = useFormContext<FormValues>();

  const [sendVerification,
    { isLoading: isVerificationSending }] = userApi.endpoints.sendVerification.useMutation();

  const { enqueueSnackbar } = useSnackbar();

  const {
    data: fetchedCities,
    isLoading,
  } = cityApi.endpoints.getCities.useQuery({ argument: null });

  if (isLoading) return (<>Идет загрузка...</>);

  const cities = fetchedCities || [];

  const onNextStep = async ({ phone }: InformationFormValues) => {
    const { verificationId } = await sendVerification({ countryCode: 'KZ', phone }).unwrap();

    setValue('verificationId', verificationId);

    enqueueSnackbar('На ваш WhatsApp был отправлен код', { variant: 'success' });

    setStep(1);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
    }}
    >
      <Stack minWidth="300px" spacing={1}>
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
          <option hidden>
            Выберите ваш город
          </option>

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
        />

      </Stack>
      <Stack minWidth="300px" spacing={1}>
        <Typography marginBottom={1}> Дополнительная информация</Typography>
        <RHFTextField
          name="description"
          label="Введите дополнительную информацию"
          multiline
        />
        <Typography marginBottom={1}> Выбранные услуги</Typography>
        <SelectedProcedures />
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(onNextStep)}
          loading={isVerificationSending}
        >
          Отправить заявку
        </LoadingButton>
      </Stack>
    </Box>

  );
}
