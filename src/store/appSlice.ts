import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from '../walletActions/types';

export enum AppScreen {
  INITIAL = 'INITIAL',
  CHOOSE_WALLET = 'CHOOSE_WALLET',
  SWAP_TOKENS = 'SWAP_TOKENS',
}

export interface AppState {
  selectedWallet: ConnectionType | undefined;
  screen: AppScreen;
}

const initialState: AppState = {
  selectedWallet: undefined,
  screen: AppScreen.INITIAL,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedWallet: (state: AppState, { payload }: { payload: ConnectionType | undefined }) => {
      state.selectedWallet = payload;
    },
    setAppScreen: (state: AppState, { payload }: { payload: AppScreen }) => {
      state.screen = payload;
    },
  },
});

export const { setSelectedWallet, setAppScreen } = appSlice.actions;

export default appSlice.reducer;
