import React from 'react';

import {
  Stack, Box, Typography, Button, styled,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import checkoutApi from '~/api/checkout/api';
import citiesApi from '~/api/cities/api';
import { RHFTextField, RHFSelect } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';
import { useResponsive } from '~/hooks/useResponsive';
import { useAppSelector } from '~/store';

import { CheckoutFormType } from '../type';
import { CheckoutSelectedProcedures } from './checkout-selected-procedures';

type CheckoutFormInfoProps = {
  setActivePage: (page: number) => void
}
type InfoSubmitted = Omit<CheckoutFormType, 'code'>

export function CheckoutFormInfo({ setActivePage }: CheckoutFormInfoProps) {
  const methods = useFormContext<InfoSubmitted>();
  const { selectedProcedures } = useAppSelector((state) => state.cartSlice);
  const { handleSubmit, setValue, setError } = methods;
  const [sendVerification] = checkoutApi.endpoints.sendVerification.useMutation();
  const { data: cities = [] } = citiesApi.endpoints.getCheckoutCities.useQuery();
  const isLaptop = useResponsive('up', 'sm');
  const variant = isLaptop ? 'body1' : 'body2';
  async function onSubmit(d: InfoSubmitted) {
    const { phone } = d;
    try {
      const { verificationId } = await sendVerification({ phone, countryCode: 'KZ' }).unwrap();
      setValue('verificationId', verificationId);
      setActivePage(1);
    } catch (error:any) {
      if (error.status === 400) {
        setError('phone', { type: 'afterSubmit', message: 'Неправильный номер' });
      }
    }
  }
  return (
    <>
      <Typography variant={variant} sx={{ mt: 2 }}>
        Заполните данную форму, и мы быстро подберем для вас вариант по вашим предпочтениям.
      </Typography>
      <BoxStyle>
        <Box display="flex">
          <Stack spacing={1} width="100%">
            <Typography variant={variant}>
              Имя:
            </Typography>
            <RHFTextField
              name="firstName"
              fullWidth
              placeholder="Введите имя"
            />
            <Typography variant={variant}>
              Фамилия:
            </Typography>
            <RHFTextField
              name="lastName"
              placeholder="Введите фамилию"
            />
            <Typography variant={variant}>
              Адрес:
            </Typography>
            <RHFTextField
              name="address"
              placeholder="Введите адрес"
            />
            <Typography variant={variant}>
              Ваш город
            </Typography>
            <RHFSelect
              name="cityId"
            >
              <option value="" disabled>Выберите город</option>
              {cities?.map((city) => (
                <option key={city.slug} value={city.id}>{city.name}</option>
              ))}
            </RHFSelect>
            <Typography variant={variant}>
              Номер телефона (WhatsApp)
            </Typography>
            <RHFPhoneField
              name="phone"
              placeholder="Номер телефона"
            />
          </Stack>
        </Box>
        <Box display="flex">
          <Stack spacing={1} width="100%">
            <Typography variant={variant}>
              Выбранные услуги:
            </Typography>
            <CheckoutSelectedProcedures />
            <Typography variant={variant}>
              Дополнительная информация:
            </Typography>
            <RHFTextField
              name="description"
              placeholder="Дополнительная информация"
              multiline
              rows={3}
            />
          </Stack>
        </Box>
      </BoxStyle>
      <Typography variant={isLaptop ? 'h6' : 'subtitle2'}>
        При вводе номера телефона убедитесь, что на данный номер установлен WhatsApp
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4, mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          sx={{ pl: 10, pr: 10 }}
          disabled={selectedProcedures.length === 0}
          onClick={handleSubmit(onSubmit)}
        >
          Отправить заявку
        </Button>
      </Box>
    </>
  );
}
const BoxStyle = styled(Box)(({ theme }) => (
  {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up(768)]: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  }
));
