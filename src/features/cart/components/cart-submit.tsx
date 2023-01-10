import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  TextField, Stack, Box,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import procedureApi from '~/api/procedures/api';
import { CreateProcedureRequest } from '~/api/procedures/types';
import userApi from '~/api/user/api';
import { PhoneVerificationSendParams, PhoneVerificationConfirmParams } from '~/api/user/types';
import { useAppSelector } from '~/store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: 'flex',
  flexDirection: 'column',
};
export function CartSubmit() {
  const { enqueueSnackbar } = useSnackbar();
  const [submit, setSubmit] = useState<CreateProcedureRequest>({
    verificationId: '',
    description: '',
    procedures: [],
  });
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState<PhoneVerificationSendParams>(
    { countryCode: 'KZ', phone: '' },
  );

  const cartProcedures = useAppSelector((state) => state.cartSlice.procedures);

  const [verification, setVerification] = useState<PhoneVerificationConfirmParams>(
    { verificationId: '', code: '' },
  );

  const [sendVerification] = userApi.endpoints.sendVerification.useMutation();

  const [confirmVerification] = userApi.endpoints.confirmVerification.useMutation();

  const [createProcedures] = procedureApi.endpoints.createProcedures.useMutation();

  const [openCodeForm, setOpenCodeForm] = useState(false);

  async function handleNumberSubmit() {
    setLoading(true);
    const result = await sendVerification(number).unwrap();
    enqueueSnackbar('На ваш whatsApp отпрален код', { variant: 'success' });
    setLoading(false);
    setSubmit({
      ...submit,
      verificationId: result.verificationId,
      procedures: cartProcedures.map((item) => ({ id: item.id, quantity: item.quantity })),
    });
    setVerification({ ...verification, verificationId: result.verificationId });
    setOpenCodeForm(true);
  }

  async function handleVerification() {
    setLoading(true);
    await confirmVerification(verification).unwrap();
    await createProcedures(submit);
    enqueueSnackbar('Ваш заказ отпрален докторам', { variant: 'success' });

    setLoading(false);
  }

  return (
    <Stack sx={{ ...style }} spacing={2}>
      {!openCodeForm && (
      <>
        Введите номер
        <TextField
          value={number.phone}
          placeholder="(707)-777-77-77"
          onChange={(e) => setNumber({ ...number, phone: e.target.value })}
        />
        {number.phone.length === 10 && (
        <Box>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={() => {
              handleNumberSubmit();
            }}
          >
            Подтвердить номер
          </LoadingButton>

        </Box>
        )}
      </>
      )}
      {openCodeForm && (
      <>
        Введите код подтверждения
        <TextField
          value={verification.code}
          placeholder="Код подтверждения"
          onChange={(e) => setVerification({ ...verification, code: e.target.value })}
        />
        <TextField
          value={submit.description}
          placeholder="Коментарии к заказу"
          multiline
          onChange={(e) => setSubmit({ ...submit, description: e.target.value })}
        />
        {verification.code.length === 6 && (
        <LoadingButton loading={loading} variant="contained" onClick={() => handleVerification()}>
          Оформить заказ
        </LoadingButton>
        )}
      </>
      )}

    </Stack>
  );
}
