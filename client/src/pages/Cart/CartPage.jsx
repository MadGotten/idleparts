import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import AuthContext from '../../context/AuthContext';
import Spinner from '../../components/Spinner';

function CartPage() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [user] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartProducts.length > 0) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_APP_DOMAIN}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ ids: cartProducts }),
      })
        .then((response) => {
          if (response.status === 400) {
            clearCart();
          }
          return response.json();
        })
        .then((data) => setProducts(data.items));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [cartProducts]);

  useEffect(() => {
    let amount = 0;
    for (const productId of cartProducts) {
      const price = products.find((product) => product._id === productId)?.price || 0;
      amount += parseFloat(price);
    }
    setTotal(amount.toFixed(2));
  }, [cartProducts, products]);

  const buyproducts = async () => {
    if (user) {
      const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/cart/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ ids: cartProducts }),
      });
      await response?.json();
      clearCart();
    } else {
      navigate('/login');
    }
  };

  const { deleteProduct } = useContext(CartContext);
  function deleteFromCart(productId) {
    deleteProduct(productId);
  }

  return (
    <div className='flex flex-col md:flex-row w-full items-center sm:items-start md:justify-between gap-8 md:gap-4'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className='flex flex-col'>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {cartProducts?.length > 0 && (
              <>
                <h2 className='text-xl font-medium mb-4'>Cart: </h2>
                <div className='flex flex-col gap-6'>
                  {products.map((products) => (
                    <div
                      key={products._id}
                      className='flex gap-4 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg'
                    >
                      <Link to={'/p/' + products._id}>
                        <img
                          src={`${import.meta.env.VITE_APP_DOMAIN}/static/${products.img}`}
                          alt='cpu'
                          className='w-28 h-auto object-contain'
                        ></img>
                      </Link>
                      <div className='flex flex-col justify-between w-52 lg:w-64 min-h-[8rem] items-end'>
                        <div className='flex flex-row items-start gap-3'>
                          <p className='text-right'>{products.name}</p>
                          <button
                            onClick={() => deleteFromCart(products._id)}
                            className='text-blue-600 rounded-lg'
                          >
                            <i className='fa-solid fa-trash'></i>
                          </button>
                        </div>
                        <div className='flex flex-row gap-1 justify-end'>
                          <div className='flex rounded-lg w-20 p-2 justify-center bg-blue-600 text-white text-sm'>
                            {products.price}$
                          </div>
                          <div className='flex rounded-lg w-8 p-2 justify-center bg-blue-600 text-white text-sm'>
                            {cartProducts.filter((id) => id === products._id).length}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className='flex flex-col w-full md:w-[18.75rem] justify-between h-40 bg-slate-50 shadow-md drop-shadow-md rounded-lg p-2'>
            <h2 className='flex text-lg justify-center'>Checkout</h2>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between font-normal text-lg'>
                Total:{' '}
                <div className='flex flex-col items-end font-semibold gap-1'>
                  {total}${' '}
                  <span className='font-normal text-sm text-gray-500'>+ free delivery</span>
                </div>
              </div>
              <button
                onClick={() => buyproducts()}
                className='flex justify-center w-full bg-blue-600 rounded-lg p-2 text-white'
              >
                Pay now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
