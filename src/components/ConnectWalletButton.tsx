import { Box } from '@mui/material';
import { useCallback } from 'react';
import { AppScreen, setAppScreen } from '~/store/appSlice';
import { useAppDispatch } from '~/store/hooks';
import { PrimaryButton } from './common/PrimaryButton';

export const ConnectWalletButton: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const onConnectWalletClick = useCallback((): void => {
    dispatch(setAppScreen(AppScreen.CHOOSE_WALLET));
  }, [dispatch]);

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} flexGrow={1}>
      <PrimaryButton fullWidth variant={'contained'} onClick={onConnectWalletClick}>
        {'connect wallet'}
      </PrimaryButton>
    </Box>
  );
};
