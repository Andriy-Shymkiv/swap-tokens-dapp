export type Token = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
};

export type TokenMap = { [address: string]: Token };
export type TokenListMap = { [chainId: number]: TokenMap };
