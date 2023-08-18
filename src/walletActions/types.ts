import { Connector } from '@web3-react/types';

// wallet

export enum ConnectionType {
  METAMASK = 'METAMASK',
  COINBASE_WALLET = 'COINBASE WALLET',
  WALLET_CONNECT = 'WALLETCONNECT',
  NETWORK = 'NETWORK',
}

export interface Connection {
  connector: Connector;
  type: ConnectionType;
}

// chains

export enum ChainId {
  MAINNET = '1',
  ARBITRUM = '42161',
  OPTIMISM = '10',
  POLYGON = '137',
  BSC = '56',
  AVALANCHE = '43114',
  FANTOM = '250',
}

export interface ChainInformationConfig {
  rpcUrls: string[];
  name: string;
  nativeToken: Token;
  blockExplorerUrls: string;
}

export type ChainConfig = Record<ChainId, ChainInformationConfig>;

// tokens

export interface Token {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}
