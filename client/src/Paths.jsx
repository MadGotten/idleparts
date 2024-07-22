import { useContext, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Layout from './components/Layout/Layout';
const HomePage = lazy(() => import('./pages/Homepage/HomePage.jsx'));
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage.jsx'));
const CartPage = lazy(() => import('./pages/Cart/CartPage.jsx'));
const AccountPage = lazy(() => import('./pages/Account/AccountPage.jsx'));
const ProductPage = lazy(() => import('./pages/Product/ProductPage.jsx'));
const SearchPage = lazy(() => import('./pages/Product/SearchPage.jsx'));
const CategoryPage = lazy(() => import('./pages/Category/CategoryPage.jsx'));
const OrdersPage = lazy(() => import('./pages/Order/OrdersPage.jsx'));
const OrdersDetailPage = lazy(() => import('./pages/Order/OrdersDetailPage.jsx'));
const WishlistPage = lazy(() => import('./pages/Wishlist/WishlistPage.jsx'));

const Paths = () => {
  const [user] = useContext(AuthContext);

  const ProtectedRoute = ({ isAllowed = user, redirectPath = '/login', children }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  };
  return (
    <Suspense>
      <Routes>
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!user} redirectPath="/">
              <AuthPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="account/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="account/orders/:id"
            element={
              <ProtectedRoute>
                <OrdersDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="account/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route path="/p" element={<SearchPage />} />
          <Route path="/p/:product_id" element={<ProductPage />} />
          <Route path="/c/:category" element={<CategoryPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Paths;
