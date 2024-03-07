import { Web3Provider } from '@ethersproject/providers';
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';
import { useState, useEffect } from 'react';
import myTokenAbi from '~/abis/mytoken.json';
import { MY_TOKEN } from '~/utils/constants';
import { useSnackbar } from './useSnackbar';

// the most of this hooks probably will be deleted after pdp
export function useMyToken(): Contract | null {
  const [myToken, setMyToken] = useState<Contract | null>(null);
  const { provider, account } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (!provider || !account) {
      return;
    }
    const contract = new Contract(
      MY_TOKEN,
      myTokenAbi,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // todo: need to fix type mismatch between ethers and @web3-react
      provider.getSigner(),
    );
    setMyToken(contract);
  }, [provider, account]);

  return myToken;
}

export function useMyTokenDetails(): UseQueryResult<
  {
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: bigint;
  },
  Error
> {
  const myToken = useMyToken();

  return useQuery(
    ['myTokenDetails'],
    async () => {
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        myToken?.name?.(),
        myToken?.symbol?.(),
        myToken?.decimals?.(),
        myToken?.totalSupply?.(),
      ]);
      return { name, symbol, decimals, totalSupply };
    },
    {
      enabled: !!myToken,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
}

export function useIsAdmin(address?: string): UseQueryResult<boolean, Error> {
  const myToken = useMyToken();

  return useQuery(
    ['isAdmin', address],
    () => {
      return myToken?.hasRole?.(myToken?.ADMIN_ROLE?.(), address);
    },
    { enabled: !!myToken && !!address },
  );
}

export function useIsBlackListed(address?: string): UseQueryResult<boolean, Error> {
  const myToken = useMyToken();

  return useQuery(
    ['isBlackListed', address],
    () => {
      return myToken?.blackList?.(address);
    },
    { enabled: !!myToken && !!address },
  );
}

export function useBalanceOf(address?: string): UseQueryResult<string, Error> {
  const myToken = useMyToken();
  return useQuery(
    ['balanceOf', address],
    () => {
      return myToken?.balanceOf?.(address);
    },
    { enabled: !!myToken && !!address },
  );
}

export function useAllowance(address?: string): UseQueryResult<string, Error> {
  const myToken = useMyToken();
  return useQuery(
    ['allowance', address],
    () => {
      return myToken?.allowance?.(address, address);
    },
    { enabled: !!myToken && !!address },
  );
}

export function useManageBlackList(): UseMutationResult<void, unknown, { action: 'add' | 'remove'; account: string }> {
  const myToken = useMyToken();
  const { showSnackbar } = useSnackbar();
  return useMutation(
    ['manageBlackList'],
    async ({ action, account }) => {
      const executable = action === 'add' ? 'addToBlackList' : 'removeFromBlackList';
      return myToken?.[executable]?.([account]);
    },
    {
      onError: () => {
        showSnackbar({
          message: 'Error managing black list, maybe you are not allowed to do this',
          severity: 'error',
        });
      },
    },
  );
}

export function useTransfer(): UseMutationResult<void, unknown, { to: string; amount: bigint }> {
  const myToken = useMyToken();
  const { showSnackbar } = useSnackbar();
  return useMutation(
    ['transfer'],
    async ({ to, amount }) => {
      return myToken?.transfer?.(to, amount);
    },
    {
      onError: () => {
        showSnackbar({
          message: 'Error transferring tokens',
          severity: 'error',
        });
      },
    },
  );
}

export function useMint(): UseMutationResult<void, unknown, { to: string; amount: bigint }> {
  const myToken = useMyToken();
  const { showSnackbar } = useSnackbar();
  return useMutation(
    ['mint'],
    async ({ to, amount }) => {
      return myToken?.mint?.(to, amount);
    },
    {
      onError: () => {
        showSnackbar({
          message: 'Error minting tokens',
          severity: 'error',
        });
      },
    },
  );
}

export function useBurnFrom(): UseMutationResult<void, unknown, { from: string; amount: bigint }> {
  const myToken = useMyToken();
  const { showSnackbar } = useSnackbar();
  return useMutation(
    ['burnFrom'],
    async ({ from, amount }) => {
      return myToken?.burnFrom?.(from, amount);
    },
    {
      onError: () => {
        showSnackbar({
          message: 'Error burning tokens',
          severity: 'error',
        });
      },
    },
  );
}