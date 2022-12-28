import React from 'react';

import { Switch, FormControlLabel, FormControlLabelProps } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

type IProps = Omit<FormControlLabelProps, 'control'>;

interface Props extends IProps {
  name: string;
}

export function RHFSwitch({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={(
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
      )}
      {...other}
    />
  );
}
