import { useAppSelector } from '~/store/hooks';
import { useTokenAllowances } from './useTokenAllowance';
import { useTokenBalances } from './useTokenBalances';

type UseSwapConditionResult = {
  isEnoughBalance: boolean;
  isEnoughAllowance: boolean;
};

export const useSwapCondition = (): UseSwapConditionResult => {
  const { youPay } = useAppSelector(({ app }) => app);
  const { amount, token } = youPay;

  const { data: tokenBalances } = useTokenBalances();
  const { data: tokenAllowances } = useTokenAllowances();

  const balance = tokenBalances?.[token.address]?.amount;
  const allowance = tokenAllowances?.[token.address]?.amount;
  const amountInWei = Number(amount) * 10 ** token.decimals;

  const isEnoughBalance = Number(balance) >= Number(amountInWei);
  const isEnoughAllowance = Number(allowance) >= Number(amountInWei);

  return {
    isEnoughBalance,
    isEnoughAllowance,
  };
};
