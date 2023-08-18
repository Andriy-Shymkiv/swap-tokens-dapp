export interface RequestApproveParams {
  spender: string;
  clientAddress: string;
  tokenAddress: string;
  chainId: number;
  // if amount is missed, approve will be called with max uint256
  amount?: string;
}

export interface MulticallResponse {
  humanAmount: string;
  amount: string;
}
