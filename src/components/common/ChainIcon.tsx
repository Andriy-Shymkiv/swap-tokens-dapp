import { CHAINS } from '~/walletActions/chains';
import { ChainId } from '~/walletActions/types';

interface ChainIconProps {
  chainId: ChainId;
}

export const ChainIcon: React.FC<ChainIconProps> = ({ chainId = ChainId.MAINNET }: ChainIconProps) => {
  const chainName = CHAINS[chainId].name.toLowerCase();

  return <img src={`/images/chains/${chainName}.svg`} width={20} height={20} alt={chainName} />;
};
