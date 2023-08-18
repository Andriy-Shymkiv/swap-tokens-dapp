import { Button } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useAppDispatch } from '~/store/hooks';
import { useCallback } from 'react';
import { flipTokens } from '~/store/appSlice';

export const FlipTokensButton: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFlipTokens = useCallback((): void => {
    dispatch(flipTokens());
  }, [dispatch]);

  return (
    <Button variant={'outlined'} onClick={handleFlipTokens}>
      <SwapVertIcon />
    </Button>
  );
};
