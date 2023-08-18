import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useWeb3React } from '@web3-react/core';
import { useAppSelector } from '~/store/hooks';
import { getMultipleAllowances } from '~/utils/web3Utils';
import { ONE_MINUTE, SWAP_SPENDER } from '~/utils/constants';
import { ChainId, Token } from '~/walletActions/types';
import { useTokenLists } from './useTokenLists';
import { MulticallResponse } from '~/types/utils';

export const constructTokenAllowancesCacheKey = (chainId: ChainId): any[] => ['tokensAllowances', chainId];

export const useTokenAllowances = (): UseQueryResult<Record<string, MulticallResponse | null>> => {
  const { selectedChainId } = useAppSelector(({ app }) => app);
  const { account } = useWeb3React();
  const { data: tokensList } = useTokenLists();

  const tokens = tokensList?.[selectedChainId] as Token[];

  return useQuery(
    constructTokenAllowancesCacheKey(selectedChainId),
    () => getMultipleAllowances(account ?? '', selectedChainId, tokens, SWAP_SPENDER),
    {
      enabled: !!account?.length && !!tokens.length,
      cacheTime: ONE_MINUTE,
      staleTime: ONE_MINUTE,
    },
  );
};
