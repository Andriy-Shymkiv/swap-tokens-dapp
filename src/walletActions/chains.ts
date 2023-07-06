import { ChainConfig, ChainId } from './types';

export const CHAINS: ChainConfig = {
  [ChainId.MAINNET]: {
    rpcUrls: ['https://eth.llamarpc.com'],
    name: 'Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: 'https://etherscan.io/',
  },
  [ChainId.OPTIMISM]: {
    rpcUrls: ['https://mainnet.optimism.io'],
    name: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: 'https://optimistic.etherscan.io',
  },
  [ChainId.ARBITRUM]: {
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    name: 'Arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: 'https://arbiscan.io',
  },
  [ChainId.POLYGON]: {
    rpcUrls: ['https://polygon-rpc.com'],
    name: 'Polygon',
    nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
    blockExplorerUrls: 'https://polygonscan.com',
  },
  [ChainId.BSC]: {
    rpcUrls: ['https://bsc-mainnet.gateway.pokt.network/v1/lb/6136201a7bad1500343e248d'],
    name: 'Bsc',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    blockExplorerUrls: 'https://bscscan.com',
  },
  [ChainId.AVALANCHE]: {
    rpcUrls: ['https://rpc.ankr.com/avalanche'],
    name: 'Avalanche',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: 'https://goerli-explorer.optimism.io',
  },
  [ChainId.FANTOM]: {
    rpcUrls: ['https://rpc.ftm.tools'],
    name: 'Fantom',
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
    blockExplorerUrls: 'https://ftmscan.com',
  },
};

export const CHAINS_TO_DISPLAY = Object.keys(CHAINS);

export const URLS = Object.keys(CHAINS).reduce<{
  [chainId: string]: string[];
}>((acc, chainId) => {
  const validURLs: string[] = CHAINS[chainId as keyof typeof CHAINS].rpcUrls;
  acc[Number(chainId)] = validURLs;

  return acc;
}, {});
