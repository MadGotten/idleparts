import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const getWishlist = async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account/wishlist`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
  });
  const data = await response?.json();

  return data.wishlist;
};

function WishlistPage() {
  const { isLoading, data, status } = useQuery('wishlist', getWishlist);
  const [wishlist, SetWishlist] = useState([]);

  const deleteWishlist = async (productId) => {
    let updatedWishlist = wishlist.filter((product) => {
      console.log(product._id);
      return product._id !== productId;
    });
    SetWishlist(updatedWishlist);

    await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account/wishlist/` + productId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      credentials: 'include',
    });
  };

  useEffect(() => {
    SetWishlist(data);
  }, [data]);

  return (
    <div>
      <div className='flex flex-col items-start gap-4'>
        <h1 className='text-2xl font-semibold'>Wishlist</h1>
        <div className='flex flex-col gap-4 w-96'>
          {status === 'error' || isLoading ? (
            <></>
          ) : wishlist && wishlist.length > 0 ? (
            wishlist.map((product) => {
              return (
                <div
                  className='flex justify-between gap-4 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg'
                  key={product._id}
                >
                  <Link to={'/p/' + product._id}>
                    <div className='w-[5rem] h-[5rem] flex items-center'>
                      <img
                        src={`${import.meta.env.VITE_APP_DOMAIN}/static/${product.img}`}
                        alt={product.name}
                        className='w-full h-full'
                      ></img>
                    </div>
                  </Link>
                  <div className='flex flex-col justify-between j text-end'>
                    <p>{product.name}</p>
                    <div className='flex justify-end gap-2'>
                      <button
                        onClick={() => deleteWishlist(product._id)}
                        className='text-blue-600 rounded-lg'
                      >
                        <i className='fa-solid fa-trash'></i>
                      </button>
                      <p>{product.price}$</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products in wishlist</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
