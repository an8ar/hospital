import React from 'react';

import {
  Checkbox, Typography, Stack, StackProps,
} from '@mui/material';

interface Props extends StackProps {
  dense?: boolean;
  actions?: React.ReactNode;
  rowCount: number;
  numSelected: number;
  onSelectAllRows: (checked: boolean) => void;
}

export function TableSelectedActions({
  dense,
  actions,
  rowCount,
  numSelected,
  onSelectAllRows,
  sx,
  ...other
}: Props) {
  const isSelectedAll = numSelected > 0 && numSelected < rowCount;
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        px: 2,
        top: 0,
        left: 8,
        right: 8,
        zIndex: 9,
        height: 58,
        borderRadius: 1,
        position: 'absolute',
        bgcolor: 'primary.lighter',
        ...(dense && {
          pl: 1,
          height: 38,
        }),
        ...sx,
      }}
      {...other}
    >
      <Checkbox
        indeterminate={isSelectedAll}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
          onSelectAllRows(event.target.checked)
        )}
      />

      <Typography
        variant="subtitle1"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: 'primary.main',
          ...(dense && {
            ml: 3,
          }),
        }}
      >
        {numSelected}
        {' '}
        selected
      </Typography>

      {actions && actions}
    </Stack>
  );
}
