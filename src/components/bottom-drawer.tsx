import React from 'react';

import {
  Box, styled, SwipeableDrawer, SwipeableDrawerProps,
} from '@mui/material';

type Props = Omit<SwipeableDrawerProps, 'onOpen'> & {
  children?: React.ReactNode;
  onClose?: VoidFunction;
  onOpen?: VoidFunction;
};

export function BottomDrawer({
  children, onClose, onOpen, ...drawerProps
}: Props) {
  const handleOnOpen = () => {
    onOpen?.();
  };

  return (
    <DrawerStyle {...drawerProps} onClose={onClose} onOpen={handleOnOpen} anchor="bottom">
      <ContentStyle>{children}</ContentStyle>
    </DrawerStyle>
  );
}

const DrawerStyle = styled(SwipeableDrawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    background: theme.palette.background.neutral,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(3),
  },
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  flex: 1,
}));
