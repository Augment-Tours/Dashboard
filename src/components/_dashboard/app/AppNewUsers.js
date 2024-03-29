import { Icon } from '@iconify/react';
import fileImageOutlined from '@iconify/icons-ant-design/file-image-outlined';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1352831;

export default function AppNewUsers() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={fileImageOutlined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(5)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Number of Target Images
      </Typography>
    </RootStyle>
  );
}
