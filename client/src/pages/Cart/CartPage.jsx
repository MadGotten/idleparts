import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '@/context/CartContext';
import AuthContext from '@/context/AuthContext';
import Spinner from '@/components/Spinner';

function CartPage() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
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
          if (!response.ok) {
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
      if (cartProducts.length <= 0) return;
      setIsUpdating(true);
      const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/cart/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ ids: cartProducts }),
      });
      await response?.json();
      setIsUpdating(false);
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
    <div className="flex flex-col">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">Cart</h1>
          <div className="flex flex-col md:flex-row w-full items-center sm:items-start md:justify-between gap-8 md:gap-4">
            {!cartProducts?.length && 'Your cart is empty'}
            {cartProducts?.length > 0 && (
              <div className="flex flex-col gap-6 w-full md:w-fit">
                {products.map((products) => (
                  <div
                    key={products._id}
                    className="flex gap-4 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg"
                  >
                    <Link to={'/p/' + products._id} className="flex">
                      <img
                        src={`${import.meta.env.VITE_APP_DOMAIN}/static/${products.img}`}
                        alt="cpu"
                        className="min-w-24 w-24 sm:w-28 h-auto object-contain"
                      ></img>
                    </Link>
                    <div className="flex flex-col justify-between w-full md:w-52 lg:w-64 min-h-[8rem] items-end">
                      <div className="flex flex-row items-start gap-3">
                        <p className="text-right">{products.name}</p>
                        <button
                          onClick={() => deleteFromCart(products._id)}
                          className="text-blue-600 rounded-lg"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <div className="flex flex-row gap-1 justify-end">
                        <div className="flex rounded-lg w-20 p-2 justify-center bg-blue-600 text-white text-sm">
                          {products.price}$
                        </div>
                        <div className="flex rounded-lg w-8 p-2 justify-center bg-blue-600 text-white text-sm">
                          {cartProducts.filter((id) => id === products._id).length}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col w-full md:w-[18.75rem] justify-between h-40 bg-slate-50 shadow-md drop-shadow-md rounded-lg p-2">
              <h2 className="flex text-lg justify-center">Checkout</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between font-normal text-lg">
                  Total:{' '}
                  <div className="flex flex-col items-end font-semibold gap-1">
                    {total}${' '}
                    <span className="font-normal text-sm text-gray-500">+ free delivery</span>
                  </div>
                </div>
                <button
                  onClick={() => buyproducts()}
                  className="flex justify-center w-full bg-blue-600 rounded-lg p-2 text-white"
                >
                  {isUpdating ? (
                    <svg
                      className="animate-spin h-6 w-full fill-white"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                        opacity=".25"
                      />
                      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
                    </svg>
                  ) : (
                    'Pay now'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
