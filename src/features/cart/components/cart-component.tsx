import React from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '~/store';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export function CartComponent() {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cartSlice.procedures);
  return (
    <IconButton aria-label="cart" size="large" onClick={() => navigate('/checkout')}>
      <StyledBadge badgeContent={cart.length} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
