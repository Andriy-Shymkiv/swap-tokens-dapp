import { useMutation } from '@tanstack/react-query';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { assert } from 'ts-essentials';
import { useAppSelector } from '~/store/hooks';
import { SWAP_SPENDER } from '~/utils/constants';
import { requestApprove } from '~/utils/web3Utils';

export const useRequestApprove = () => {
  const { youPay } = useAppSelector(({ app }) => app);
  const { provider, account, chainId } = useWeb3React();
  const amountInWei = Number(youPay.amount) * 10 ** youPay.token.decimals;

  const approve = useCallback(() => {
    assert(provider && account && chainId, 'missing provider, account, or chainId');

    return requestApprove(provider, {
      clientAddress: account,
      tokenAddress: youPay.token.address,
      chainId,
      amount: amountInWei.toString(),
      spender: SWAP_SPENDER,
    });
  }, [provider, account, chainId, amountInWei, youPay.token.address]);

  return useMutation(['requestApprove'], approve);
};
