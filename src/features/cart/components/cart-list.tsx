import * as React from 'react';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  ListItemText, ListItem, IconButton, Stack,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import { useAppSelector, useAppDispatch } from '~/store';

import { removeProcedure } from '../cart-slice';

// ----------------------------------------------------------------------

export function CartList() {
  const cartProcedures = useAppSelector((state) => state.cartSlice.procedures);
  const dispatch = useAppDispatch();
  return (
    <List>
      <Stack spacing={1}>
        {cartProcedures.map((value) => {
          const labelId = `list-label-${value.id}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={(
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => dispatch(removeProcedure(value))}
                >
                  <HighlightOffIcon color="error" />
                </IconButton>
            )}
            >
              <ListItemText
                id={labelId}
                key={value.id}
                primary={`${value.name} от - ${value.maxPrice} тг`}
              />

              <Divider />
            </ListItem>

          );
        })}
      </Stack>
    </List>
  );
}
