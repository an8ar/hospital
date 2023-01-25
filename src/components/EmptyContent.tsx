import React from 'react';

import { Typography, Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

interface Props extends BoxProps {
  title: string;
  description?: string;
}

export default function EmptyContent({ title, description, ...other }: Props) {
  return (
    <RootStyle {...other}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
