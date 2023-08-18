import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { setSelectedChainId } from '~/store/appSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { CHAINS_TO_DISPLAY, CHAINS } from '~/walletActions/chains';
import { switchChain } from '~/walletActions/switchChain';
import { ChainId } from '~/walletActions/types';
import { ChainIcon } from './common/ChainIcon';

export const SelectChain: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedChainId } = useAppSelector(({ app }) => app);
  const { connector } = useWeb3React();

  const handleChange = useCallback(
    async (event: SelectChangeEvent<ChainId>) => {
      const chainId = event.target.value as ChainId;

      try {
        await switchChain(connector, chainId);
        dispatch(setSelectedChainId(chainId));
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to switch to chain ${chainId}`);
      }
    },
    [dispatch, connector],
  );

  return (
    <FormControl>
      <InputLabel>{'Chain'}</InputLabel>
      <Select label="Chain" value={selectedChainId} onChange={handleChange}>
        {CHAINS_TO_DISPLAY.map((chain) => (
          <MenuItem value={chain} key={chain}>
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <ChainIcon chainId={chain as ChainId} />
              {CHAINS[chain as ChainId].name}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
