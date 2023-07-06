import { Web3ReactProvider } from '@web3-react/core';

import { ReactNode } from 'react';
import useEagerlyConnect from '~/hooks/useEagerlyConnect';
import { CONNECTORS } from '../walletActions/connections';

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps): JSX.Element => {
  useEagerlyConnect();

  return <Web3ReactProvider connectors={CONNECTORS}>{children}</Web3ReactProvider>;
};
