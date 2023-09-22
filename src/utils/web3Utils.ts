import { JsonRpcProvider, Contract } from 'ethers';
import { Token } from '~/types/tokens';
import { defaultAbiCoder } from '@ethersproject/abi';
import { formatUnits } from '@ethersproject/units';
import erc20Abi from '~/abis/erc20.json';
import multiCallAbi from '~/abis/multicall.json';
import { CHAINS } from '~/walletActions/chains';
import { ChainId } from '~/walletActions/types';
import { MulticallResponse, RequestApproveParams } from '~/types/utils';
import { MULTI_CALL_ADDRESS, UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from './constants';

interface InitUtilsResult {
  getMultipleBalances: (
    userAddress: string,
    chainId: string,
    tokens: Token[],
  ) => Promise<Record<string, MulticallResponse | null>>;
  getMultipleAllowances: (
    userAddress: string,
    chainId: string,
    tokens: Token[],
    spender: string,
  ) => Promise<Record<string, MulticallResponse | null>>;
  getAllowance: (clientAddress: string, token: string, chainId: number, spender: string) => Promise<string>;
  requestApprove: (library: any, params: RequestApproveParams) => Promise<any>;
}

// @todo: define types where any is used
function web3Utils(rpcMap: Partial<Record<string, string>>): InitUtilsResult {
  const providers = Object.entries(rpcMap).reduce<Record<string, JsonRpcProvider>>(
    (acc, [chainId, url]) => ({ ...acc, [chainId]: new JsonRpcProvider(url) }),
    {},
  );
  const erc20 = new Contract('', erc20Abi, Object.values(providers)[0]);

  async function sendCalls(chainId: string, calls: [string, string][]): Promise<any> {
    const multiCallAddress = MULTI_CALL_ADDRESS[chainId as keyof typeof MULTI_CALL_ADDRESS];
    if (!providers[chainId] || !multiCallAddress) throw new Error('Invalid chain id');

    try {
      const multiCall = new Contract(multiCallAddress, multiCallAbi, providers[chainId]);

      // this function should be used only for read-only calls
      return multiCall.tryAggregate?.(false, calls);
    } catch (error: any) {
      console.error(error.message);
      throw new Error('Error calling multicall contract');
    }
  }

  function decodeResponseAndGroupByTokenAddress(
    response: any,
    tokens: Token[],
    type: string,
  ): Record<string, MulticallResponse | null> {
    const groupedResponse: Record<string, MulticallResponse | null> = {};

    response.forEach(({ returnData, success }: { returnData: any; success: any }, index: number) => {
      const token = tokens[index] as Token;
      const tokenAddress = token.address.toLowerCase();

      if (!success) {
        groupedResponse[tokenAddress] = null;
      } else if (returnData === '0x') {
        groupedResponse[tokenAddress] = { humanAmount: '0', amount: '0' };
      } else {
        const balanceInWei: string = defaultAbiCoder.decode([type], returnData)[0];
        groupedResponse[tokenAddress] = {
          amount: balanceInWei.toString(),
          humanAmount: formatUnits(balanceInWei, token.decimals),
        };
      }
    });

    return groupedResponse;
  }

  async function getMultipleBalances(
    userAddress: string,
    chainId: string,
    tokens: Token[],
  ): Promise<Record<string, MulticallResponse | null>> {
    const balanceOfCall = erc20.interface.encodeFunctionData('balanceOf', [userAddress]);

    const calls: [string, string][] = tokens.map((token) => [token.address, balanceOfCall]);

    const balancesResponse = await sendCalls(chainId, calls);

    return decodeResponseAndGroupByTokenAddress(balancesResponse, tokens, 'uint256');
  }

  async function getMultipleAllowances(
    userAddress: string,
    chainId: string,
    tokens: Token[],
    spender: string,
  ): Promise<Record<string, MulticallResponse | null>> {
    const allowanceCall = erc20.interface.encodeFunctionData('allowance', [userAddress, spender]);
    const calls: [string, string][] = tokens.map((token) => [token.address, allowanceCall]);

    const allowancesResponse = await sendCalls(chainId, calls);

    return decodeResponseAndGroupByTokenAddress(allowancesResponse, tokens, 'uint256');
  }

  async function getAllowance(clientAddress: string, token: string, chainId: number, spender: string): Promise<string> {
    try {
      const contract = new Contract(token, erc20Abi, providers[chainId]);

      return contract.allowance?.(clientAddress, spender);
    } catch (e) {
      return '0';
    }
  }

  async function requestApprove(library: any, params: RequestApproveParams): Promise<any> {
    const { clientAddress, tokenAddress, chainId, amount, spender } = params;

    const allowanceAmount = amount ?? UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
    const data = erc20.interface.encodeFunctionData('approve', [spender, allowanceAmount]);
    const txParams = { value: '0', data: data, from: clientAddress, to: tokenAddress, chainId };

    const signer = library.getSigner(clientAddress);

    return signer.sendTransaction(txParams);
  }

  return { getMultipleBalances, getMultipleAllowances, getAllowance, requestApprove };
}

const rpcMap = Object.keys(CHAINS).reduce<Record<string, string>>((acc, chain) => {
  acc[chain] = CHAINS[chain as ChainId].rpcUrls[0] as string;

  return acc;
}, {});

export const { getMultipleBalances, getMultipleAllowances, requestApprove } = web3Utils(rpcMap);
