import { Button } from '@mui/material';
import { useCallback } from 'react';
import { AppScreen, setAppScreen } from '~/store/appSlice';
import { useAppDispatch } from '~/store/hooks';

export const ConnectWalletButton = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const onConnectWalletClick = useCallback((): void => {
    dispatch(setAppScreen(AppScreen.CHOOSE_WALLET));
  }, [dispatch]);

  return (
    <Button variant={'contained'} onClick={onConnectWalletClick}>
      {'connect wallet'}
    </Button>
  );
};
