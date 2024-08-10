import { useState, createContext, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

export const WishlistContext = createContext({});

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchWishlistItems();
    } else {
      setWishlist([]);
      setWishlistCount(0);
    }
  }, [user]);

  const fetchWishlistItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account/wishlist`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include',
      });

      const data = await response?.json();
      if (response.status === 200) {
        setWishlist(data.wishlist);
        setWishlistCount(data.wishlist.length);
      } else {
        console.log('Error fetching wishlist items: ', data.message);
      }
    } catch (error) {
      setIsError(true);
      console.error('Error fetching wishlist items: ', error);
    }
    setIsLoading(false);
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ productId: productId }),
      });
      const data = await response?.json();
      if (response.status === 201) {
        setWishlist(data.wishlist);
        setWishlistCount(data.wishlist.length);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error adding to wishlist: ', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_DOMAIN}/account/wishlist/${productId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          credentials: 'include',
        }
      );
      if (response.status === 204) {
        setWishlist(wishlist.filter((product) => product._id !== productId));
        setWishlistCount(wishlistCount - 1);
      }
    } catch (error) {
      console.error('Error removing from wishlist: ', error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, wishlistCount, addToWishlist, removeFromWishlist, isLoading, isError }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;
