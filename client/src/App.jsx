import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DialogProvider } from './context/DialogContext';
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
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <DialogProvider>
              <QueryClientProvider client={queryClient}>
                <Paths />
              </QueryClientProvider>
            </DialogProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
