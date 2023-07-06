import { Box, Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { getEllipsisString } from '~/helpers/utils';
import { AppScreen, setAppScreen, setSelectedWallet } from '~/store/appSlice';
import { useAppDispatch } from '~/store/hooks';

export const SwapTokensScreen = (): JSX.Element => {
  const { account, connector } = useWeb3React();
  const dispatch = useAppDispatch();

  const handleDisconnect = useCallback(() => {
    if (connector.deactivate) connector.deactivate();

    dispatch(setAppScreen(AppScreen.INITIAL));
    dispatch(setSelectedWallet(undefined));
    connector.resetState();
  }, [connector, dispatch]);

  return (
    <>
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'} gap={4}>
        {`Account address: ${getEllipsisString(account)}`}
        <Button variant={'contained'} onClick={handleDisconnect}>
          {'disconnect'}
        </Button>
      </Box>
    </>
  );
};
