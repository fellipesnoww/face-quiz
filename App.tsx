import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/global/theme';
import Home from './src/screens/Home';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home/>
    </ThemeProvider>
  );
}