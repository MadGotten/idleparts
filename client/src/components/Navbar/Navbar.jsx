import { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '@/context/CartContext';
import WishlistContext from '@/context/WishlistContext';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

const logoUrl = new URL('@/assets/images/logo.png', import.meta.url).href;
const userUrl = new URL('@/assets/images/user.png', import.meta.url).href;

function Navbar() {
  const { cartProducts } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchContext, setSearchContext] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  let navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchContext.length > 0) {
      navigate(`/p?search=${encodeURIComponent(searchContext)}`);
    }
  };

  const handleChange = (event) => {
    setSearchContext(event.target.value);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 200); // 0.2 second delay after mouse leave hover group
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-row items-center sm:justify-between gap-6 sm:gap-4">
      <div className="flex flex-row gap-6 sm:gap-8 w-full">
        <Link to="/">
          <img src={logoUrl} alt="logo" className="w-16 h-8" />
        </Link>
        <div className="flex flex-row w-full">
          <input
            type="search"
            placeholder="Search..."
            value={searchContext}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="border-neutral-300 border p-2 sm:p-4 text-sm rounded-l-lg w-full sm:w-64 h-8 focus:outline-none focus:border-blue-600"
          ></input>
          <Link
            to={{
              pathname: '/p',
              search: `search=${encodeURIComponent(searchContext)}`,
              state: { searchContext },
            }}
          >
            <button className="w-10 h-full bg-blue-600 rounded-r-lg text-white text-sm">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </Link>
        </div>
      </div>
      <ul className="hidden md:flex flex-row items-center gap-6">
        <Link to="/help" className="hover:text-blue-600">
          <li className="flex w-8 text-2xl">
            <button className="w-full h-full">
              <i className="fa-regular fa-comment"></i>
            </button>
          </li>
        </Link>
        <Link to="/account/wishlist" className="hover:text-blue-600">
          <li className="flex w-8 text-2xl relative">
            <button className="w-full h-full">
              {wishlistCount > 0 && (
                <div className="w-5 h-5 rounded-full bg-orange-600 text-white absolute left-5 bottom-4 text-sm flex justify-center items-center">
                  {wishlistCount}
                </div>
              )}
              <i className="fa-regular fa-heart"></i>
            </button>
          </li>
        </Link>
        <Link to="/cart" className="hover:text-blue-600">
          <li className="flex w-8 text-2xl relative">
            <button className="w-full h-full">
              {cartProducts.length > 0 && (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white absolute left-5 bottom-4 text-sm flex justify-center items-center">
                  {cartProducts.length}
                </div>
              )}
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </li>
        </Link>
        <div className="w-1 h-5 mx-5 border-r border-gray-300"></div>
        <div
          className="group relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <li className="w-8 h-8">
            <img src={userUrl} alt="profile" className="h-full" />
          </li>
          <div
            className={`absolute drop-shadow-md w-60 bg-white z-10 rounded-tr-md rounded-br-md rounded-bl-md right-0 p-4 ${isVisible ? 'block' : 'hidden'}`}
          >
            <AccountMenu />
          </div>
        </div>
      </ul>
      <button className="flex md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}

export default Navbar;
