import { ChangeEvent, useState } from 'react';

import React, { TextField, TextFieldProps } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

const PHONE_MASK = [
  '+',
  /\d/,
  ' ',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export function RHFPhoneField({ name, ...other }: Props) {
  const { control, watch, setValue } = useFormContext();

  const phone = watch(name);

  const [maskedPhone, setMaskedPhone] = useState(phone);

  const handleChange = (
    { target }: ChangeEvent<HTMLInputElement>,
  ) => {
    const phoneValue = target.value;

    const unmaskedPhone = phoneValue?.replace(/[^\d]/g, '');
    // set unmasked phone to form value
    setValue(name, unmaskedPhone);
    setMaskedPhone(phoneValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <MaskedInput
          onChange={handleChange}
          // material ui removes mask on first focus
          onFocus={handleChange}
          mask={PHONE_MASK}
          render={(innerRef, props) => (
            <TextField
              value={maskedPhone}
              error={!!error}
              helperText={error?.message}
              inputRef={innerRef}
              {...other}
              {...props}
            />
          )}
        />
      )}
    />
  );
}
