import React from 'react';

import {
  Box,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  styled,
} from '@mui/material';

// utils
// @types
import { Iconify } from '~/components/Iconify';
import { TableHeadCustom } from '~/components/table';
import { Procedure } from '~/features/procedures';

import { CartProcedure } from '../types';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Процедура' },
  { id: 'price', label: 'Цена' },
  { id: 'quantity', label: 'Количество' },
  { id: 'totalPrice', label: 'Итого', align: 'right' },
  { id: '' },
];

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

// ----------------------------------------------------------------------

type Props = {
  procedure: CartProcedure[];
  onDelete: (id: Procedure) => void;
  onDecreaseQuantity: (id: Procedure) => void;
  onIncreaseQuantity: (id: Procedure) => void;
};

export function CartProcedureList({
  procedure,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {procedure.map((row) => (
            <CheckoutProductListRow
              key={row.id}
              row={row}
              onDelete={() => onDelete(row)}
              onDecrease={() => onDecreaseQuantity(row)}
              onIncrease={() => onIncreaseQuantity(row)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

type CheckoutProductListRowProps = {
  row: CartProcedure;
  onDelete: VoidFunction;
  onDecrease: VoidFunction;
  onIncrease: VoidFunction;
};

function CheckoutProductListRow({
  row,
  onDelete,
  onDecrease,
  onIncrease,
}: CheckoutProductListRowProps) {
  const {
    name, quantity, minPrice, maxPrice,
  } = row;

  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        {minPrice}
        {' '}
        tg
        {' '}
        -
        {' '}
        {maxPrice}
        {' '}
        tg
      </TableCell>

      <TableCell>
        <Incrementer
          quantity={quantity}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
      </TableCell>

      <TableCell align="right">
        {minPrice * quantity}
        {' '}
        tg
        {' '}
        -
        {' '}
        {maxPrice * quantity}
        {' '}
        tg
      </TableCell>

      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon="eva:trash-2-outline" width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// ----------------------------------------------------------------------

type IncrementerProps = {
  quantity: number;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
};

function Incrementer({
  quantity, onIncrease, onDecrease,
}: IncrementerProps) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Iconify icon="eva:minus-fill" width={16} height={16} />
        </IconButton>

        {quantity}

        <IconButton
          size="small"
          color="inherit"
          onClick={onIncrease}
        >
          <Iconify icon="eva:plus-fill" width={16} height={16} />
        </IconButton>
      </IncrementerStyle>
    </Box>
  );
}
