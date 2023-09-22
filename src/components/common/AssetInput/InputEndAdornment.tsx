import { Button, Box, Typography, styled } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Token } from '~/types/tokens';

const StyledSelectTokenButton = styled(Button, {
  name: 'StyledSelectTokenButton',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  maxWidth: 'fit-content',
  gap: theme.spacing(2),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.success.light,
}));

const StyledTokenImage = styled('img', {
  name: 'StyledTokenImage',
})(() => ({
  width: 24,
  height: 24,
}));

type InputEndAdornmentProps = {
  token: Token;
  onClick: () => void;
};

export const InputEndAdornment: React.FC<InputEndAdornmentProps> = ({ token, onClick }) => {
  return (
    <StyledSelectTokenButton variant={'contained'} fullWidth onClick={onClick}>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <StyledTokenImage src={token.logoURI} />
        <Typography variant={'body1'}>{token.symbol}</Typography>
      </Box>
      <ArrowDropDownIcon />
    </StyledSelectTokenButton>
  );
};
