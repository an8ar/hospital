import React, { useState } from 'react';

import { TextField, Button, Stack } from '@mui/material';

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
  const [submit, setSubmit] = useState<CreateProcedureRequest>({
    verificationId: '',
    description: '',
    procedures: [],
  });

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
    const result = await sendVerification(number).unwrap();
    setSubmit({
      ...submit,
      verificationId: result.verificationId,
      procedures: cartProcedures.map((item) => ({ id: item.id, quantity: item.quantity })),
    });
    setVerification({ ...verification, verificationId: result.verificationId });
    setOpenCodeForm(true);
  }

  async function handleVerification() {
    await confirmVerification(verification).unwrap();
    await createProcedures(submit);
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
        <Button variant="contained" onClick={() => handleNumberSubmit()}>
          Подтвердить номер
        </Button>
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
        <Button variant="contained" onClick={() => handleVerification()}>
          Оформить заказ
        </Button>
        )}
      </>
      )}

    </Stack>
  );
}
