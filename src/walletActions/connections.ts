import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { Actions, Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import { CHAINS, URLS } from './chains';
import { ChainId, Connection, ConnectionType } from './types';

const callbacks: Record<ConnectionType, (actions: Actions) => Connector> = {
  [ConnectionType.METAMASK]: (actions: Actions): MetaMask => new MetaMask({ actions }),
  [ConnectionType.COINBASE_WALLET]: (actions: Actions): CoinbaseWallet =>
    new CoinbaseWallet({ actions, options: { url: CHAINS[ChainId.MAINNET].rpcUrls[0] ?? '', appName: '' } }),
  [ConnectionType.WALLET_CONNECT]: (actions: Actions): WalletConnect =>
    new WalletConnect({ actions, options: { rpc: URLS } }),
  [ConnectionType.NETWORK]: (actions: Actions): Network => new Network({ actions, urlMap: URLS }),
};

const [metaMask, metaMaskHooks] = initializeConnector(callbacks[ConnectionType.METAMASK]);
const [coinbase, coinbaseHooks] = initializeConnector(callbacks[ConnectionType.COINBASE_WALLET]);
const [walletConnect, walletConnectHooks] = initializeConnector(callbacks[ConnectionType.WALLET_CONNECT]);
const [network, networkHooks] = initializeConnector(callbacks[ConnectionType.NETWORK]);

export const CONNECTIONS: Record<ConnectionType, Connection> = {
  [ConnectionType.METAMASK]: { connector: metaMask, type: ConnectionType.METAMASK },
  [ConnectionType.COINBASE_WALLET]: { connector: coinbase, type: ConnectionType.COINBASE_WALLET },
  [ConnectionType.WALLET_CONNECT]: { connector: walletConnect, type: ConnectionType.WALLET_CONNECT },
  [ConnectionType.NETWORK]: { connector: network, type: ConnectionType.NETWORK },
};

// for user to choose from
export const AVAILABLE_CONNECTIONS: Connection[] = [
  CONNECTIONS[ConnectionType.METAMASK],
  CONNECTIONS[ConnectionType.COINBASE_WALLET],
  CONNECTIONS[ConnectionType.WALLET_CONNECT],
];

// for web3ReactProvider
export const CONNECTORS: [Connector, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [coinbase, coinbaseHooks],
  [walletConnect, walletConnectHooks],
  [network, networkHooks],
];
