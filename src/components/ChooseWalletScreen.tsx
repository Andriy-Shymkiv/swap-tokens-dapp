import { Button } from '@mui/material';
import { useConnectWallet } from '~/hooks/useConnectWallet';
import { AVAILABLE_CONNECTIONS } from '~/walletActions/connections';

export const ChooseWalletScreen = (): JSX.Element => {
  const { mutate } = useConnectWallet();

  return (
    <>
      {AVAILABLE_CONNECTIONS.map((connection) => (
        <Button variant={'contained'} key={connection.type} onClick={(): void => mutate(connection)}>
          {connection.type}
        </Button>
      ))}
    </>
  );
};
