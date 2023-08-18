import { Box } from '@mui/material';
import { useConnectWallet } from '~/hooks/useConnectWallet';
import { AVAILABLE_CONNECTIONS } from '~/walletActions/connections';
import { PrimaryButton } from './common/PrimaryButton';

export const ChooseWalletScreen: React.FC = (): JSX.Element => {
  const { mutate: connectWalletMutate } = useConnectWallet();

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={4} flexGrow={1}>
      {AVAILABLE_CONNECTIONS.map((connection) => (
        <PrimaryButton
          fullWidth
          variant={'contained'}
          key={connection.type}
          onClick={(): void => connectWalletMutate(connection)}
        >
          {connection.type}
        </PrimaryButton>
      ))}
    </Box>
  );
};
