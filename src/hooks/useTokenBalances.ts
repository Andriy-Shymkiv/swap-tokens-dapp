import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useWeb3React } from '@web3-react/core';
import { useAppSelector } from '~/store/hooks';
import { Token } from '~/types/tokens';
import { MulticallResponse } from '~/types/utils';
import { ONE_MINUTE } from '~/utils/constants';
import { getMultipleBalances } from '~/utils/web3Utils';
import { ChainId } from '~/walletActions/types';
import { useTokenLists } from './useTokenLists';

export const constructTokensBalancesCacheKey = (chainId: ChainId, account: string): QueryKey => [
  'tokensBalances',
  chainId,
  account,
];

export const useTokenBalances = (): UseQueryResult<Record<string, MulticallResponse | null>> => {
  const { selectedChainId } = useAppSelector(({ app }) => app);
  const { account } = useWeb3React();
  const { data: tokensLists } = useTokenLists();

  return useQuery<Record<string, MulticallResponse | null>>(
    constructTokensBalancesCacheKey(selectedChainId, account ?? ''),
    () => getMultipleBalances(account ?? '', selectedChainId, tokensLists?.[selectedChainId] as Token[]),
    {
      enabled: !!account?.length && !!tokensLists?.[selectedChainId],
      cacheTime: ONE_MINUTE,
      staleTime: ONE_MINUTE,
    },
  );
};
