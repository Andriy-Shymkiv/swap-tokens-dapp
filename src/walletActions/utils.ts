import { Connector } from '@web3-react/types';
import { assert } from 'ts-essentials';
import { AVAILABLE_CONNECTIONS, CONNECTIONS } from './connections';
import { Connection, ConnectionType } from './types';

export function getAvailableConnection(c: Connector | ConnectionType): Connection {
  if (c instanceof Connector) {
    const currentActiveConnection = AVAILABLE_CONNECTIONS.find((connection) => connection.connector === c);
    assert(currentActiveConnection, 'current active connection is not defined');

    return currentActiveConnection;
  } else {
    switch (c) {
      case ConnectionType.METAMASK:
        return CONNECTIONS[ConnectionType.METAMASK];
      case ConnectionType.COINBASE_WALLET:
        return CONNECTIONS[ConnectionType.COINBASE_WALLET];
      case ConnectionType.WALLET_CONNECT:
        return CONNECTIONS[ConnectionType.WALLET_CONNECT];
      case ConnectionType.NETWORK:
        return CONNECTIONS[ConnectionType.NETWORK];

      default:
        throw new Error('connection type is not defined');
    }
  }
}
