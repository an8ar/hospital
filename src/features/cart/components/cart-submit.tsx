import React, { useState } from 'react';

import { TextField, Box, Button } from '@mui/material';

import userApi from '~/api/user/api';
import { PhoneVerificationSendParams, PhoneVerificationConfirmParams } from '~/api/user/types';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
  const defaultPhoneNumber:PhoneVerificationSendParams = { countryCode: 'KZ', phone: '' };
  const [number, setNumber] = useState<PhoneVerificationSendParams>(defaultPhoneNumber);
  const defaultVerNum:PhoneVerificationConfirmParams = { verificationId: '', code: '' };
  const [verification, setVerification] = useState<PhoneVerificationConfirmParams>(defaultVerNum);
  const [sendVerification] = userApi.endpoints.sendVerification.useMutation();
  const [confirmVerification] = userApi.endpoints.confirmVerification.useMutation();

  async function handleNumberSubmit() {
    const result = await sendVerification(number).unwrap();
    setVerification({ ...verification, verificationId: result.verificationId });
    console.log(result);
  }
  async function handleVerification() {
    const response = await confirmVerification(verification).unwrap();
    console.log(response);
  }
  return (
    <Box sx={{ ...style }}>
      Введите номер
      <TextField
        value={number.phone}
        placeholder="Мобильный телефон"
        onChange={(e) => setNumber({ ...number, phone: e.target.value })}
      />
      {number.phone.length === 10 && (
      <Button variant="contained" onClick={() => handleNumberSubmit()}>
        Подтвердить номер
      </Button>
      )}
      <TextField
        value={verification.code}
        placeholder="Код подтверждения"
        onChange={(e) => setVerification({ ...verification, code: e.target.value })}

      />
      {verification.code.length === 6 && (
      <Button variant="contained" onClick={() => handleVerification()}>
        Оформить заказ
      </Button>
      )}

    </Box>
  );
}
