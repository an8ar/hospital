import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  TextField, Stack, Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import procedureApi from '~/api/procedures/api';
import { CreateProcedureRequest } from '~/api/procedures/types';
import userApi from '~/api/user/api';
import { FormProvider } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';
import { useAppSelector } from '~/store';

type PhoneFormProps = {
  phone: string;
};
type CodeFormProps = {
  code: string;
};

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyntent: 'center',
  marginTop: 2,
  marginBottom: 2,
};

const PhoneSchema = yup.object().shape({
  phone: yup.string().required('Введите номер телефона')
    .min(11, 'Не правильный номер телефона').max(11),
});
const CodeSchema = yup.object().shape({
  code: yup.string().required('Введите код из whatsApp').min(6, 'Введите полностью код').max(6),
});

export function CartSubmit() {
  const methods = useForm<PhoneFormProps>({
    resolver: yupResolver(PhoneSchema),
    mode: 'onBlur',
    defaultValues: {
      phone: '',
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const {
    handleSubmit: handleCodeSubmit, register, formState: { errors },
  } = useForm<CodeFormProps>({
    defaultValues: { code: '' },
    resolver: yupResolver(CodeSchema),
    mode: 'onBlur',
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [submit, setSubmit] = useState<CreateProcedureRequest>({
    verificationId: '',
    description: '',
    procedures: [],
  });

  const cartProcedures = useAppSelector((state) => state.cartSlice.procedures);

  const [sendVerification] = userApi.endpoints.sendVerification.useMutation();

  const [confirmVerification] = userApi.endpoints.confirmVerification.useMutation();

  const [createProcedures] = procedureApi.endpoints.createProcedures.useMutation();

  const [openCodeForm, setOpenCodeForm] = useState(false);

  const onSubmitCode = async (typedCode:CodeFormProps) => {
    await confirmVerification({
      verificationId: submit.verificationId,
      code: typedCode.code,
    }).unwrap();

    await createProcedures(submit);

    enqueueSnackbar('Ваш заказ отпрален докторам', { variant: 'success' });

    navigate('/');
  };

  const onSubmitNumber = async (data: PhoneFormProps) => {
    const result = await sendVerification(
      { phone: data.phone.slice(1), countryCode: 'KZ' },
    ).unwrap();

    enqueueSnackbar('На ваш whatsApp отпрален код', { variant: 'success' });

    setSubmit({
      ...submit,
      verificationId: result.verificationId,
      procedures: cartProcedures.map((item) => ({ id: item.id, quantity: item.quantity })),
    });

    setOpenCodeForm(true);
  };

  return (
    <FormProvider methods={methods}>
      <Stack sx={{ ...style }} spacing={2}>
        {!openCodeForm && (
        <>
          <Typography>
            Введите номер
          </Typography>
          <RHFPhoneField name="phone" label="Телефон" />
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            onClick={handleSubmit(onSubmitNumber)}
          >
            Подтвердить номер
          </LoadingButton>
        </>
        )}
        {openCodeForm && (
        <>
          <Typography>
            Введите код подтверждения
          </Typography>
          <TextField
            {...register('code')}
            placeholder="Код подтверждения"
            error={!!errors.code?.message}
            helperText={errors.code?.message}
          />
          <TextField
            value={submit.description}
            placeholder="Коментарии к заказу"
            multiline
            onChange={(e) => setSubmit({ ...submit, description: e.target.value })}
          />
          <LoadingButton variant="contained" onClick={handleCodeSubmit(onSubmitCode)}>
            Оформить заказ
          </LoadingButton>
        </>
        )}

      </Stack>
    </FormProvider>

  );
}
