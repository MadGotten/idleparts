import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartContextProvider } from './context/CartContext';
//import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import Paths from './Paths';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
        <AuthProvider>
          <CartContextProvider>
            <QueryClientProvider client={queryClient}>
              <Paths />
            </QueryClientProvider>
          </CartContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
