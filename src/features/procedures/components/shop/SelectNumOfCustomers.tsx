import React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch } from '~/store';

type SelectProps={
    index: number
}

export function SelectNumOfCustomers({ index }: SelectProps) {
  const [numOfClients, setNumOfClients] = React.useState<number>(1);
  const dispatch = useAppDispatch();
  //   const number = useAppSelector((state) => state.procedureSlice.procedures[0].numberOfCustomers);
  const handleChange = (event: SelectChangeEvent) => {
    setNumOfClients(+event.target.value);
    // dispatch(selectNumberOfCustomers(+event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Количество клиентов</InputLabel>
      <Select
        labelId="demo-select-small"
        id="kmaf"
        value={numOfClients.toString()}
        label="Количество клиентов"
        onChange={handleChange}
      >
        <MenuItem value={0}>
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>1 клиент</MenuItem>
        <MenuItem value={2}>2 клиента</MenuItem>
        <MenuItem value={3}>3 клиента</MenuItem>
      </Select>
    </FormControl>
  );
}
