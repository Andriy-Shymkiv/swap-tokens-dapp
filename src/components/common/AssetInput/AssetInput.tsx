import { Box, OutlinedInput, styled, Typography } from '@mui/material';
import { useCallback, useRef } from 'react';
import { AppScreen, setAppScreen, setYouPayTokenAmount, setYouReceiveTokenAmount } from '~/store/appSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { useTokenBalances } from '~/hooks/useTokenBalances';
import { NumericFormat } from 'react-number-format';
import { NumericCustom } from './NumericCustom';
import { InputEndAdornment } from './InputEndAdornment';

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

  const { data: tokenBalances } = useTokenBalances();
  const balance = tokenBalances?.[token.address];

  const onClick = useCallback(() => {
    const nextScreen =
      type === AssetInputType.PAY ? AppScreen.SELECT_YOU_PAY_TOKEN : AppScreen.SELECT_YOU_RECEIVE_TOKEN;

    dispatch(setAppScreen(nextScreen));
  }, [dispatch, type]);

  const inputRef = useRef(null);

  const setAmountTo = useCallback(
    (amount: string) => {
      if (type === AssetInputType.PAY) {
        dispatch(setYouPayTokenAmount(amount));
      } else {
        dispatch(setYouReceiveTokenAmount(amount));
      }
    },
    [dispatch, type],
  );

  return (
    <Box width={'100%'}>
      <Typography textAlign={'right'}>
        <NumericFormat
          value={balance?.humanAmount ?? 0}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={4}
        />
      </Typography>

      <StyledAssetInput
        value={amount}
        name={type}
        onChange={(e) => setAmountTo(e.target.value)}
        inputMode={'numeric'}
        inputRef={inputRef}
        inputComponent={NumericCustom}
        fullWidth
        endAdornment={<InputEndAdornment token={token} onClick={onClick} />}
      />
    </Box>
  );
};
