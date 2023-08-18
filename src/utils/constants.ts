import { Token } from '~/types/tokens';
import { ChainId } from '~/walletActions/types';

export const ONE_MINUTE = 60 * 1000;
export const ONE_HOUR = ONE_MINUTE * 60;

export const EMPTY_ARRAY = [];

export const UNISWAP_TOKEN_LIST_URL = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';

const USDC_TOKEN_LOGO_URL =
  'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png';

export const USDC_TOKEN: Record<ChainId, Token> = {
  [ChainId.MAINNET]: {
    chainId: Number(ChainId.MAINNET),
    name: 'USDC',
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    logoURI: USDC_TOKEN_LOGO_URL,
  },
  [ChainId.OPTIMISM]: {
    chainId: Number(ChainId.OPTIMISM),
    name: 'USDC',
    symbol: 'USDC',
    address: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
    decimals: 6,
    logoURI: USDC_TOKEN_LOGO_URL,
  },
  [ChainId.BSC]: {
    chainId: Number(ChainId.BSC),
    name: 'USDC',
    symbol: 'USDC',
    address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    decimals: 18,
    logoURI: USDC_TOKEN_LOGO_URL,
  },
  [ChainId.POLYGON]: {
    chainId: Number(ChainId.POLYGON),
    name: 'USDC',
    symbol: 'USDC',
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    decimals: 6,
    logoURI: USDC_TOKEN_LOGO_URL,
  },
  [ChainId.ARBITRUM]: {
    chainId: Number(ChainId.ARBITRUM),
    name: 'USDC',
    symbol: 'USDC',
    address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    decimals: 6,
    logoURI: USDC_TOKEN_LOGO_URL,
  },
  [ChainId.AVALANCHE]: {
    chainId: Number(ChainId.AVALANCHE),
    name: 'USDC',
    symbol: 'USDC',
    address: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
    decimals: 6,
    logoURI: USDC_TOKEN_LOGO_URL,
  },
  [ChainId.FANTOM]: {
    chainId: Number(ChainId.FANTOM),
    name: 'USDC',
    symbol: 'USDC',
    address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
    decimals: 6,
    logoURI: USDC_TOKEN_LOGO_URL,
  },
};

export const MULTI_CALL_ADDRESS: Record<ChainId, string> = {
  [ChainId.MAINNET]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [ChainId.BSC]: '0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D',
  [ChainId.FANTOM]: '0xdC6E2b14260F972ad4e5a31c68294Fba7E720701',
  [ChainId.AVALANCHE]: '0xd7Fc8aD069f95B6e2835f4DEff03eF84241cF0E1',
  [ChainId.POLYGON]: '0x275617327c958bD06b5D6b871E7f491D76113dd8',
  [ChainId.ARBITRUM]: '0x7ecfbaa8742fdf5756dac92fbc8b90a19b8815bf',
  [ChainId.OPTIMISM]: '0x2DC0E2aa608532Da689e89e237dF582B783E552C',
};

export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const SWAP_SPENDER = '0xb7742b7cf4d590de1f2bded0139537fea8f00710';
