import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/skeletons/ProductCard';
import CartContext from '@/context/CartContext';
import WishlistContext from '@/context/WishlistContext';
import AuthContext from '@/context/AuthContext';

const getProduct = async (product_id) => {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/products/${product_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  });
  const data = await response?.json();

  return data.items;
};

function ProductPage() {
  const { product_id } = useParams();
  const { isLoading, data, status } = useQuery(['product', product_id], () =>
    getProduct(product_id)
  );
  const { addProduct } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const handleAddToWishlist = async () => {
    if (!user) return navigate('/login');
    if (isUpdating) return;
    setIsUpdating(true);
    await addToWishlist(product_id);
    setIsUpdating(false);
  };

  return (
    <>
      {status === 'error' || isLoading ? (
        <ProductCard />
      ) : (
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="flex flex-col md:flex-row gap-x-8 gap-y-4 md:justify-between h-auto w-full sm:w-2/3 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg">
            <div className="flex justify-center md:justify-start w-full md:w-fit">
              <img
                src={`${import.meta.env.VITE_APP_DOMAIN}/static/${data.img}`}
                alt="component_image"
                className="max-h-[180px] md:max-h-[220px] min-w-full max-w-[260px] h-auto object-contain mix-blend-multiply"
              ></img>
            </div>
            <div className="w-full">
              <h1 className="font-semibold text-lg text-center md:text-start md:text-xl">
                {data.name}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-1/3 p-4 justify-between bg-slate-50 shadow-md drop-shadow-md rounded-lg">
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">{data.price}$</div>
              <div className="text-base">
                {data.stock ? <>{`only ${data.stock} in stock`}</> : <>Out of stock</>}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddToWishlist}
                className="bg-orange-400 hover:bg-orange-500 rounded-lg text-center p-2 text-sm text-slate-200 whitespace-nowrap"
              >
                {isUpdating ? (
                  <svg
                    className="animate-spin h-5 w-full fill-white"
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
                  'Add to Wishlist'
                )}
              </button>
              <button
                onClick={() => addProduct(data._id)}
                className="bg-blue-600 hover:bg-blue-700 rounded-lg text-center p-3 text-base text-slate-200"
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
