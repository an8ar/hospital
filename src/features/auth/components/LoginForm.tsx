import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import authApi from '~/api/auth/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export function LoginForm() {
  const [login] = authApi.endpoints.login.useMutation();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data).unwrap();
      navigate('/');
    } catch (error: any) {
      if (error.status === 400 && error.data?.validationErrors?.length > 0) {
        const { path, message } = error.data.validationErrors[0];
        setError(path, { message, type: 'custom' });
        setError('afterSubmit', { message: 'Wrong credentials', type: 'custom' });
      }
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          name="email"
          label="Электронная почта"
        />

        <RHFTextField
          name="password"
          label="Пароль"
          type="password"
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Войти
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
