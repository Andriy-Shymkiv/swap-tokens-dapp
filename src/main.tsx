import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { WalletProvider } from './providers/WalletProvider';
import { store } from './store';
import '~/styles/index.css';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactQueryProvider>
        <WalletProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </WalletProvider>
      </ReactQueryProvider>
    </Provider>
  </React.StrictMode>,
);
