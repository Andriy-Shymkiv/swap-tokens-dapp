import { Box, Button, OutlinedInput, styled, Typography } from '@mui/material';
import { useCallback } from 'react';
import { AppScreen, setAppScreen } from '~/store/appSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledAssetInput = styled(OutlinedInput, {
  name: 'StyledAssetInput',
})(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(2),
  '& input': {
    padding: 0,
    marginRight: theme.spacing(2),
  },
}));

const StyledTokenImage = styled('img', {
  name: 'StyledTokenImage',
})(() => ({
  width: 24,
  height: 24,
}));

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

export enum AssetInputType {
  PAY = 'PAY',
  RECEIVE = 'RECEIVE',
}

interface AssetInputProps {
  type: AssetInputType;
}

export const AssetInput: React.FC<AssetInputProps> = ({ type }): JSX.Element => {
  const { youPay, youReceive } = useAppSelector(({ app }) => app);
  const { amount, token } = type === AssetInputType.PAY ? youPay : youReceive;
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => {
    const nextScreen =
      type === AssetInputType.PAY ? AppScreen.SELECT_YOU_PAY_TOKEN : AppScreen.SELECT_YOU_RECEIVE_TOKEN;

    dispatch(setAppScreen(nextScreen));
  }, [dispatch, type]);

  return (
    <StyledAssetInput
      value={amount}
      fullWidth
      endAdornment={
        <StyledSelectTokenButton variant={'contained'} fullWidth onClick={onClick}>
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <StyledTokenImage src={token.logoURI} />
            <Typography variant={'body1'}>{token.symbol}</Typography>
          </Box>
          <ArrowDropDownIcon />
        </StyledSelectTokenButton>
      }
    />
  );
};
