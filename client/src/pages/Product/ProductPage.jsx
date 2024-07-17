import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import CartContext from '../../context/CartContext';

async function getProduct() {
  const response = await fetch(
    `${import.meta.env.VITE_APP_DOMAIN}/products/` + window.location.pathname.slice(3),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    }
  );
  const data = await response?.json();

  return data.items;
}

async function addWishlist(productId) {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account/wishlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({ productId: productId }),
  });
  const data = await response?.json();

  return data.wishlist;
}

function ProductPage() {
  const { product_id } = useParams();
  const { isLoading, data, status } = useQuery(['product', product_id], getProduct);
  const { addProduct } = useContext(CartContext);

  return (
    <>
      {status === 'error' || isLoading ? (
        <></>
      ) : (
        <div className='flex flex-col sm:flex-row w-full gap-4'>
          <div className='flex flex-col md:flex-row gap-x-2 gap-y-4 md:justify-between h-auto w-full sm:w-2/3 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg'>
            <div className='flex justify-center md:justify-start md:w-1/2'>
              <img
                src={`${import.meta.env.VITE_APP_DOMAIN}/static/${data.img}`}
                alt='component_image'
                className='md:max-w-full md:max-h-[220px] h-auto'
              ></img>
            </div>
            <div className='md:w-1/2'>
              <h1 className='font-semibold text-lg md:text-xl'>{data.name}</h1>
            </div>
          </div>
          <div className='flex flex-col w-full sm:w-1/3 p-4 justify-between bg-slate-50 shadow-md drop-shadow-md rounded-lg'>
            <div className='flex flex-col gap-2'>
              <div className='text-xl font-semibold'>{data.price}$</div>
              <div className='text-base'>
                {data.stock ? <>{`only ${data.stock} in stock`}</> : <>Out of stock</>}
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <button
                onClick={() => addWishlist(data._id)}
                className='bg-orange-400 hover:bg-orange-500 rounded-lg text-center p-2 text-sm text-slate-200 whitespace-nowrap'
              >
                Add to wishlist
              </button>
              <button
                onClick={() => addProduct(data._id)}
                className='bg-blue-600 hover:bg-blue-700 rounded-lg text-center p-3 text-base text-slate-200'
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;
