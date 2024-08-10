import { useState, createContext, useEffect } from 'react';

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const localcart = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState({});
  const [cartLength, setCartLength] = useState(0);

  console.log(cartProducts);

  useEffect(() => {
    if (cartLength > 0) {
      localcart?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts, localcart, cartLength]);

  useEffect(() => {
    if (localcart && localcart.getItem('cart')) {
      const localItems = JSON.parse(localcart.getItem('cart'));
      setCartProducts(localItems);
      setCartLength(Object.keys(localItems).length);
    }
  }, [localcart]);

  function addProduct(productId) {
    setCartProducts((prevCartProducts) => {
      const updatedCartProducts = { ...prevCartProducts };

      if (updatedCartProducts[productId]) {
        updatedCartProducts[productId] += 1;
      } else {
        updatedCartProducts[productId] = 1;
      }
      setCartLength(Object.keys(updatedCartProducts).length);
      return updatedCartProducts;
    });
  }

  function updateProduct(productId, quantity) {
    setCartProducts((prevCartProducts) => {
      const updatedCartProducts = { ...prevCartProducts };

      if (updatedCartProducts[productId] && quantity > 0) {
        updatedCartProducts[productId] = quantity;
      }
      setCartLength(Object.keys(updatedCartProducts).length);
      return updatedCartProducts;
    });
  }

  function deleteProduct(productId) {
    setCartProducts((prevCartProducts) => {
      const updatedCartProducts = { ...prevCartProducts };

      if (updatedCartProducts[productId] > 1) {
        updatedCartProducts[productId] -= 1;
      } else {
        delete updatedCartProducts[productId];
      }
      if (Object.keys(updatedCartProducts).length === 0) {
        localcart?.removeItem('cart');
      }
      setCartLength(Object.keys(updatedCartProducts).length);
      return updatedCartProducts;
    });
  }

  function clearCart() {
    setCartProducts({});
    setCartLength(0);
    localcart?.removeItem('cart');
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, cartLength, addProduct, updateProduct, deleteProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
