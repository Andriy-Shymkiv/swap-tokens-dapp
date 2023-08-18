import { ChainConfig, ChainId, Token } from './types';

export const NATIVE_TOKENS: Record<ChainId, Token> = {
  [ChainId.MAINNET]: {
    chainId: 1,
    name: 'ETH',
    symbol: 'ETH',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  [ChainId.POLYGON]: {
    chainId: 137,
    name: 'MATIC',
    symbol: 'MATIC',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
  },
  [ChainId.FANTOM]: {
    chainId: 250,
    name: 'FTM',
    symbol: 'FTM',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    logoURI: 'https://tokens.1inch.io/0x4e15361fd6b4bb609fa63c81a2be19d873717870.png',
  },
  [ChainId.BSC]: {
    chainId: 56,
    name: 'BNB',
    symbol: 'BNB',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    logoURI: 'https://iconape.com/wp-content/files/ti/209546/svg/binance-coin-seeklogo.com.svg',
  },
  [ChainId.AVALANCHE]: {
    chainId: 43114,
    name: 'AVAX',
    symbol: 'AVAX',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    logoURI: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022',
  },
  [ChainId.ARBITRUM]: {
    chainId: 42161,
    name: 'ETH',
    symbol: 'ETH',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    decimals: 18,
  },
  [ChainId.OPTIMISM]: {
    chainId: 10,
    name: 'ETH',
    symbol: 'ETH',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    decimals: 18,
  },
};

export const CHAINS: ChainConfig = {
  [ChainId.MAINNET]: {
    rpcUrls: ['https://eth.llamarpc.com'],
    name: 'Mainnet',
    nativeToken: NATIVE_TOKENS[ChainId.MAINNET],
    blockExplorerUrls: 'https://etherscan.io/',
  },
  [ChainId.OPTIMISM]: {
    rpcUrls: ['https://mainnet.optimism.io'],
    name: 'Optimism',
    nativeToken: NATIVE_TOKENS[ChainId.OPTIMISM],
    blockExplorerUrls: 'https://optimistic.etherscan.io',
  },
  [ChainId.ARBITRUM]: {
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    name: 'Arbitrum',
    nativeToken: NATIVE_TOKENS[ChainId.ARBITRUM],
    blockExplorerUrls: 'https://arbiscan.io',
  },
  [ChainId.AVALANCHE]: {
    rpcUrls: ['https://rpc.ankr.com/avalanche'],
    name: 'Avalanche',
    nativeToken: NATIVE_TOKENS[ChainId.AVALANCHE],
    blockExplorerUrls: 'https://goerli-explorer.optimism.io',
  },
  [ChainId.POLYGON]: {
    rpcUrls: ['https://polygon-rpc.com'],
    name: 'Polygon',
    nativeToken: NATIVE_TOKENS[ChainId.POLYGON],
    blockExplorerUrls: 'https://polygonscan.com',
  },
  [ChainId.BSC]: {
    rpcUrls: ['https://bsc-mainnet.gateway.pokt.network/v1/lb/6136201a7bad1500343e248d'],
    name: 'Bsc',
    nativeToken: NATIVE_TOKENS[ChainId.BSC],
    blockExplorerUrls: 'https://bscscan.com',
  },
  [ChainId.FANTOM]: {
    rpcUrls: ['https://rpc.ftm.tools'],
    name: 'Fantom',
    nativeToken: NATIVE_TOKENS[ChainId.FANTOM],
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
