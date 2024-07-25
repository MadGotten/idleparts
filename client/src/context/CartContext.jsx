import { useState, createContext, useEffect } from 'react';

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const localcart = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      localcart?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts, localcart]);

  useEffect(() => {
    if (localcart && localcart.getItem('cart')) {
      setCartProducts(JSON.parse(localcart.getItem('cart')));
    }
  }, [localcart]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function deleteProduct(productId) {
    setCartProducts((prev) => {
      prev = prev.filter((value, index) => prev.indexOf(productId) !== index);
      if (prev.length === 0) {
        localcart?.removeItem('cart');
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
    localcart?.removeItem('cart');
  }

  return (
    <CartContext.Provider value={{ cartProducts, addProduct, deleteProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
