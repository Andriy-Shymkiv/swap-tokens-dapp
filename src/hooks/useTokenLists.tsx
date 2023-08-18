import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchTokenList } from '~/api/tokens';
import { TokenListMap, TokenMap } from '~/types/tokens';
import { ONE_HOUR } from '~/utils/constants';
import { ChainId, Token } from '~/walletActions/types';

const getTokenLists = async (): Promise<Record<ChainId, Token[]>> => {
  const tokens = await fetchTokenList();
  const tokenListMap: TokenListMap = {};

  tokens.map((token: Token) => {
    if (!tokenListMap[token.chainId]) tokenListMap[token.chainId] = {}; // if no token list for this chainId, create it
    const tokenMap = tokenListMap[token.chainId] as TokenMap; // get token list for this chainId
    tokenMap[token.address] = { ...token, address: token.address.toLowerCase() }; // add token to tokenListMap
  });

  const tokenLists: Record<ChainId, Token[]> = {
    [ChainId.MAINNET]: Object.values(tokenListMap[ChainId.MAINNET] ?? {}),
    [ChainId.ARBITRUM]: Object.values(tokenListMap[ChainId.ARBITRUM] ?? {}),
    [ChainId.AVALANCHE]: Object.values(tokenListMap[ChainId.AVALANCHE] ?? {}),
    [ChainId.BSC]: Object.values(tokenListMap[ChainId.BSC] ?? {}),
    [ChainId.FANTOM]: Object.values(tokenListMap[ChainId.FANTOM] ?? {}),
    [ChainId.POLYGON]: Object.values(tokenListMap[ChainId.POLYGON] ?? {}),
    [ChainId.OPTIMISM]: Object.values(tokenListMap[ChainId.OPTIMISM] ?? {}),
  };

  return tokenLists;
};

export const constructTokensListQueryKey = (): any[] => ['tokenLists'];

export const useTokenLists = (): UseQueryResult<Record<ChainId, Token[]>> => {
  return useQuery<Record<ChainId, Token[]>>(constructTokensListQueryKey(), () => getTokenLists(), {
    staleTime: ONE_HOUR,
    cacheTime: ONE_HOUR,
  });
};
