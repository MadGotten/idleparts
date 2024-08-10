import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import ProductCard from '@/components/skeletons/ProductCard';
import CartContext from '@/context/CartContext';
import WishlistContext from '@/context/WishlistContext';

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
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAddToWishlist = async () => {
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
          <div className="flex flex-col md:flex-row gap-x-2 gap-y-4 md:justify-between h-auto w-full sm:w-2/3 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg">
            <div className="flex justify-center md:justify-start md:w-1/2">
              <img
                src={`${import.meta.env.VITE_APP_DOMAIN}/static/${data.img}`}
                alt="component_image"
                className="md:max-w-full md:max-h-[220px] h-auto"
              ></img>
            </div>
            <div className="md:w-1/2">
              <h1 className="font-semibold text-lg md:text-xl">{data.name}</h1>
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
                    className="animate-spin h-5 w-full text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
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
