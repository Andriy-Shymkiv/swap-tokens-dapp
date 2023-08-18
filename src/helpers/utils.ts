import { CHAINS } from '~/walletActions/chains';
import { ChainId } from '~/walletActions/types';

export const getEllipsisString = (str?: string, startChars = 4, endChars = 4): string => {
  if (!str) return '';

  if (str.length <= startChars + endChars) return str;

  return `${str.slice(0, startChars)}...${str.slice(-endChars)}`;
};

type NonEmptyArray<T> = [T, ...T[]];

export function isNonEmptyArray<A>(arr: Array<A>): arr is NonEmptyArray<A> {
  return arr.length > 0;
}

export function isSupportedChain(chainId: ChainId): chainId is ChainId {
  return !!chainId && !!CHAINS[chainId];
}
