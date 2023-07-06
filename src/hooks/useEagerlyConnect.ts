import { Connector } from '@web3-react/types';
import { useEffect } from 'react';
import { Connection, ConnectionType } from '~/walletActions/types';
import { getAvailableConnection } from '~/walletActions/utils';
import { CONNECTIONS } from '~/walletActions/connections';
import { setSelectedWallet } from '~/store/appSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

async function connect(connector: Connector): Promise<void> {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly();
    } else {
      await connector.activate();
    }
  } catch (error) {
    console.error('eager connection error', error);
    throw new Error('eager connection failed');
  }
}

export default function useEagerlyConnect(): void {
  const { selectedWallet } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  let selectedConnection: Connection | undefined;

  if (selectedWallet) {
    try {
      selectedConnection = getAvailableConnection(selectedWallet);
    } catch {
      dispatch(setSelectedWallet(undefined));
    }
  }

  useEffect(() => {
    connect(CONNECTIONS[ConnectionType.NETWORK]?.connector as Connector);

    if (selectedConnection) {
      connect(selectedConnection.connector);
    }
  }, [selectedConnection]);
}
