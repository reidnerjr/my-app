import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { CartProvider } from './Context/CartContext';
import Header from './components/Header';

export function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <AppRoutes />
        </CartProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
