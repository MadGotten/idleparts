import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '@/context/WishlistContext';

function WishlistPage() {
  const { wishlist, wishlistCount, removeFromWishlist, isLoading, isError } =
    useContext(WishlistContext);

  return (
    <div>
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold">Wishlist</h1>
        <div className="flex flex-col gap-4 w-96">
          {isError || isLoading ? (
            <></>
          ) : wishlist && wishlistCount > 0 ? (
            wishlist.map((product) => {
              return (
                <div
                  className="flex justify-between gap-4 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg"
                  key={product._id}
                >
                  <Link to={'/p/' + product._id}>
                    <div className="w-[5rem] h-[5rem] flex items-center">
                      <img
                        src={`${import.meta.env.VITE_APP_DOMAIN}/static/${product.img}`}
                        alt={product.name}
                        className="w-full max-h-full"
                      ></img>
                    </div>
                  </Link>
                  <div className="flex flex-col justify-between text-end">
                    <p>{product.name}</p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => removeFromWishlist(product._id)}
                        className="text-blue-600 rounded-lg"
                      >
                        <i className="fa-solid fa-trash"></i>
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
