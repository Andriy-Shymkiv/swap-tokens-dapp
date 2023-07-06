import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { Connector } from '@web3-react/types';
import { useCallback, useMemo } from 'react';
import { AppScreen, setAppScreen, setSelectedWallet } from '~/store/appSlice';
import { useAppDispatch } from '~/store/hooks';
import { Connection } from '~/walletActions/types';
import { getAvailableConnection } from '~/walletActions/utils';

type UseConnectWalletCallbacks = Pick<
  UseMutationOptions<Connector, Error, Connection>,
  'onMutate' | 'onSuccess' | 'onError'
>;

export const constructWalletConnectKey = (): any[] => ['walletConnect'];

export const useConnectWallet = (): UseMutationResult<Connector, Error, Connection> => {
  const dispatch = useAppDispatch();

  const connectWallet = useCallback(async ({ connector }: { connector: Connector }): Promise<Connector> => {
    await connector.activate();

    return connector;
  }, []);

  const callbacks: UseConnectWalletCallbacks = useMemo(
    () => ({
      onSuccess: (connector: Connector): void => {
        const connection = getAvailableConnection(connector);
        dispatch(setSelectedWallet(connection.type));
        dispatch(setAppScreen(AppScreen.SWAP_TOKENS));
      },
      onError: (): void => {
        console.error('error connecting wallet');
        dispatch(setSelectedWallet(undefined));
      },
    }),
    [dispatch],
  );

  return useMutation<Connector, Error, Connection>(constructWalletConnectKey(), connectWallet, callbacks);
};
