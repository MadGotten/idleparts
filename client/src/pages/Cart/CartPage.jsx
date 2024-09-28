import { useState, useContext, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '@/context/CartContext';
import AuthContext from '@/context/AuthContext';
import Spinner from '@/components/Spinner';

function CartPage() {
  const { cartProducts, cartLength, clearCart, updateProduct, deleteProduct } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const [customValues, setCustomValues] = useState({});
  const [isCustom, setIsCustom] = useState({});

  const handleSelectChange = (productId, value) => {
    if (value === 'custom') {
      setIsCustom((prev) => ({ ...prev, [productId]: true }));
      setCustomValues((prev) => ({ ...prev, [productId]: '' }));
    } else {
      setIsCustom((prev) => ({ ...prev, [productId]: false }));
      updateProduct(productId, Number(value));
    }
  };

  const handleCustomInput = (productId, value) => {
    const quantity = value > 0 ? value : 1;
    updateProduct(productId, quantity);
    setIsCustom((prev) => ({ ...prev, [productId]: false }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (cartLength > 0) {
        setIsLoading(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ ids: Object.keys(cartProducts) }),
          });

          if (!response.ok) {
            clearCart();
            return;
          }

          const data = await response.json();
          setProducts(data.items);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [cartLength]);

  useEffect(() => {
    const amount = products.reduce((sum, product) => {
      const quantity = cartProducts[product._id] || 0;
      return sum + product.price * quantity;
    }, 0);
    setTotal(amount.toFixed(2));
  }, [cartProducts, products]);

  const buyproducts = async () => {
    if (!user) return navigate('/login');

    if (cartLength > 0) {
      setIsUpdating(true);
      const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/cart/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ products: cartProducts }),
      });
      const data = await response?.json();
      setIsUpdating(false);
      if (response.ok) {
        clearCart();
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Cart</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col md:flex-row w-full items-center sm:items-start md:justify-between gap-8 md:gap-4">
            {!cartLength && 'Your cart is empty'}
            {cartLength > 0 && (
              <div className="flex flex-col gap-6 w-full md:w-fit">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="flex gap-4 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg"
                  >
                    <Link to={'/p/' + product._id} className="flex">
                      <img
                        src={`${import.meta.env.VITE_APP_DOMAIN}/static/${product.img}`}
                        alt="cpu"
                        className="min-w-24 w-24 sm:w-28 h-auto object-contain mix-blend-multiply"
                      ></img>
                    </Link>
                    <div className="flex flex-col justify-between w-full md:w-52 lg:w-64 min-h-[8rem] items-end">
                      <div className="flex flex-row items-start gap-3">
                        <div>
                          <p className="text-right">{product.name}</p>
                          <p className="text-right font-medium text-sm">
                            In stock: {product.stock}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="text-blue-600 rounded-lg"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <div className="flex flex-row gap-1 justify-end">
                        <div className="flex rounded-lg w-20 h-9 p-2 justify-center bg-blue-600 text-white text-sm">
                          {product.price}$
                        </div>
                        {isCustom[product._id] || cartProducts[product._id] > 9 ? (
                          <input
                            type="text"
                            className="flex rounded-lg w-12 h-9 p-2 justify-center bg-blue-600 text-white text-sm text-center"
                            autoFocus
                            value={
                              customValues[product._id] !== undefined
                                ? customValues[product._id]
                                : cartProducts[product._id]
                            }
                            onChange={(e) =>
                              setCustomValues((prev) => ({
                                ...prev,
                                [product._id]: Number(e.target.value) || '',
                              }))
                            }
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleCustomInput(product._id, Number(e.target.value));
                                e.target.blur();
                              }
                            }}
                            onBlur={(e) => {
                              handleCustomInput(product._id, Number(e.target.value));
                            }}
                          />
                        ) : (
                          <select
                            className="flex rounded-lg w-12 h-9 p-2 justify-center bg-blue-600 text-white text-sm focus:outline-none"
                            value={isCustom[product._id] ? 'custom' : cartProducts[product._id]}
                            onChange={(e) => handleSelectChange(product._id, e.target.value)}
                          >
                            {new Array(product.stock > 9 ? 9 : product.stock).fill().map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                            {product.stock >= 10 && <option value="custom">10+</option>}
                          </select>
                        )}
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
                    'Proceed To Payment'
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
