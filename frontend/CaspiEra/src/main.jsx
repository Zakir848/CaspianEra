import React from 'react';
import {createRoot} from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import App from './App';
import theme from './theme/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>,
);
