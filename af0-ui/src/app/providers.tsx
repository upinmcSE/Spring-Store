import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lasonTheme } from '../theme';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={lasonTheme}>
      <CssBaseline />
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
