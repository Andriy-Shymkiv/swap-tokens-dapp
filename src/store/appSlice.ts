import { createSlice } from '@reduxjs/toolkit';
import { Token } from '~/types/tokens';
import { USDC_TOKEN } from '~/utils/constants';
import { CHAINS } from '~/walletActions/chains';
import { ChainId, ConnectionType } from '../walletActions/types';

export enum AppScreen {
  INITIAL = 'INITIAL',
  CHOOSE_WALLET = 'CHOOSE_WALLET',
  SWAP_TOKENS = 'SWAP_TOKENS',
  SELECT_YOU_PAY_TOKEN = 'SELECT_YOU_PAY_TOKEN',
  SELECT_YOU_RECEIVE_TOKEN = 'SELECT_YOU_RECEIVE_TOKEN',
}

export interface AppState {
  selectedChainId: ChainId;
  selectedWallet: ConnectionType | undefined;
  screen: AppScreen;
  youPay: { amount: string; token: Token };
  youReceive: { amount: string; token: Token };
}

const initialState: AppState = {
  selectedChainId: ChainId.MAINNET,
  selectedWallet: undefined,
  screen: AppScreen.INITIAL,
  youPay: { amount: '', token: CHAINS[ChainId.MAINNET].nativeToken },
  youReceive: { amount: '', token: USDC_TOKEN[ChainId.MAINNET] },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedChainId: (state: AppState, { payload }: { payload: ChainId }) => {
      state.selectedChainId = payload;
      state.youPay = { amount: state.youPay.amount, token: CHAINS[payload].nativeToken };
      state.youReceive = { amount: state.youReceive.amount, token: USDC_TOKEN[payload] };
    },
    setSelectedWallet: (state: AppState, { payload }: { payload: ConnectionType | undefined }) => {
      state.selectedWallet = payload;
    },
    setAppScreen: (state: AppState, { payload }: { payload: AppScreen }) => {
      state.screen = payload;
    },
    setYouPayToken: (state: AppState, { payload }: { payload: Token }) => {
      if (payload.address === state.youReceive.token.address) {
        // swap tokens in place if they are the same
        const oldYouPayToken = state.youPay.token;
        state.youPay = { amount: state.youPay.amount, token: state.youReceive.token };
        state.youReceive = { amount: state.youReceive.amount, token: oldYouPayToken };
      } else {
        state.youPay = { amount: state.youPay.amount, token: payload };
      }
    },
    // @todo: consider to combine setYouPayToken and setYouReceiveToken into one action, but is it necessary?
    setYouReceiveToken: (state: AppState, { payload }: { payload: Token }) => {
      if (payload.address === state.youPay.token.address) {
        // swap tokens in place if they are the same
        const oldYouReceiveToken = state.youReceive.token;
        state.youReceive = { amount: state.youReceive.amount, token: payload };
        state.youPay = { amount: state.youPay.amount, token: oldYouReceiveToken };
      } else {
        state.youReceive = { amount: state.youReceive.amount, token: payload };
      }
    },
  },
});

export const { setSelectedWallet, setSelectedChainId, setAppScreen, setYouPayToken, setYouReceiveToken } =
  appSlice.actions;

export default appSlice.reducer;
