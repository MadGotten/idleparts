import React, {useContext, lazy, Suspense} from 'react'
import { AuthContext } from './context/AuthContext';
import Homepage from './pages/Homepage'
import ShoppingCart from './pages/ShoppingCart'
import Profile from './pages/Profile'
import {Product, Search} from './pages/Product'
import Category from './pages/Category'
import {OrdersPage, OrdersDetailsPage} from './pages/Order'
import WishlistPage from './pages/Wishlist'
import NotFound from './pages/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'
const AuthPage = lazy(() => import('./pages/AuthPage'));


const Paths = () => {
  const [user] = useContext(AuthContext);

  const ProtectedRoute = ({ isAllowed=user, redirectPath = '/login', children }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />
    }
  
    return children
  };
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="login" element={
        <ProtectedRoute isAllowed={!user} redirectPath='/'> 
          <Suspense fallback={<></>}>
            <AuthPage /> 
          </Suspense>
        </ProtectedRoute>
      }/>
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="account/orders" element={
        <ProtectedRoute> 
          <OrdersPage /> 
        </ProtectedRoute>
      }/>
      <Route path="account/orders/:id" element={
        <ProtectedRoute> 
          <OrdersDetailsPage /> 
        </ProtectedRoute>
      }/>
      <Route path="account/wishlist" element={
        <ProtectedRoute> 
          <WishlistPage /> 
        </ProtectedRoute>
      }/>
      <Route path="/p" element={<Search />} />
      <Route path="/p/:product_id" element={<Product />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/c/:category" element={<Category />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Paths