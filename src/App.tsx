import { Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { ChooseWalletScreen } from './components/ChooseWalletScreen';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { SwapTokensScreen } from './components/SwapTokensScreen';
import { AppScreen, setAppScreen } from './store/appSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

export const App = (): JSX.Element => {
  const { screen } = useAppSelector(({ app }) => app);
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (account) {
      dispatch(setAppScreen(AppScreen.SWAP_TOKENS));
    } else {
      dispatch(setAppScreen(AppScreen.INITIAL));
    }
  }, [account, dispatch]);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={6}>
      {screen === AppScreen.INITIAL && <ConnectWalletButton />}
      {screen === AppScreen.CHOOSE_WALLET && <ChooseWalletScreen />}
      {screen === AppScreen.SWAP_TOKENS && <SwapTokensScreen />}
    </Box>
  );
};
