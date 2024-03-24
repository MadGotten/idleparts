import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../hooks/useAuth';
import { categories } from '../assets/constants';
import CartContext from '../context/CartContext';
const logoUrl = new URL('../assets/images/logo.png', import.meta.url).href;
const userUrl = new URL('../assets/images/user.png', import.meta.url).href;

function Navbar() {
  const [user, setUser] = useContext(AuthContext);
  const { cartProducts } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchContext, setSearchContext] = useState('');
  let navigate = useNavigate();

  async function Logout() {
    logoutUser().then((data) => {
      if (data.status) {
        setUser(undefined);
        localStorage.removeItem('user');
      }
    });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchContext.length > 0) {
      navigate(`/p?search=${encodeURIComponent(searchContext)}`);
    }
  };

  const handleChange = (event) => {
    setSearchContext(event.target.value);
  };

  return (
    <div className='flex flex-row items-center sm:justify-between gap-6 sm:gap-4'>
      <div className='flex flex-row gap-6 sm:gap-8 w-full'>
        <Link to='/'>
          <img src={logoUrl} alt='logo' className='w-16 h-8' />
        </Link>
        <div className='flex flex-row w-full'>
          <input
            type='search'
            placeholder='Search...'
            value={searchContext}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='border-neutral-300 border p-2 sm:p-4 text-sm rounded-l-lg w-full sm:w-64 h-8 focus:outline-none focus:border-blue-600'
          ></input>
          <Link
            to={{
              pathname: '/p',
              search: `search=${encodeURIComponent(searchContext)}`,
              state: { searchContext },
            }}
          >
            <button className='w-10 h-full bg-blue-600 rounded-r-lg text-white text-sm'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </Link>
        </div>
      </div>
      <ul className='hidden md:flex flex-row items-center gap-6'>
        <li className='flex w-8 text-2xl hover:text-blue-600'>
          <button className='w-full h-full'>
            <i className='fa-regular fa-comment'></i>
          </button>
        </li>
        <Link to='/account/wishlist' className='hover:text-blue-600'>
          <li className='flex w-8 text-2xl relative'>
            <button className='w-full h-full'>
              <i className='fa-regular fa-heart'></i>
            </button>
          </li>
        </Link>
        <Link to='/cart' className='hover:text-blue-600'>
          <li className='flex w-8 text-2xl relative'>
            <button className='w-full h-full'>
              {cartProducts.length > 0 && (
                <div className='w-5 h-5 rounded-full bg-blue-600 text-white absolute left-5 bottom-4 text-sm flex justify-center items-center'>
                  {cartProducts.length}
                </div>
              )}
              <i className='fa-solid fa-cart-shopping'></i>
            </button>
          </li>
        </Link>
        <div className='w-1 h-5 mx-5 border-r border-gray-300'></div>
        <div className='group relative'>
          <li className='w-8 h-8'>
            <img src={userUrl} alt='profile' className='h-full' />
          </li>
          <div className='hidden group-hover:block absolute drop-shadow-md w-60 bg-white z-10 rounded-tr-md rounded-br-md rounded-bl-md right-0 p-4'>
            <div className='flex flex-col items gap-2 text-sm'>
              {user ? (
                <>
                  <p className='text-sm text-center font-medium'>{user.user}</p>
                  <button
                    onClick={Logout}
                    className='bg-blue-600 hover:bg-blue-700 rounded-lg text-center p-2 text-sm text-slate-200'
                  >
                    Logout
                  </button>
                  <hr className='h-px mt-2 bg-gray-200 border-0' />
                  <Link to='/' className='flex flex-row items-center gap-2'>
                    <i className='fa-regular fa-user text-base'></i>
                    <span>Account</span>
                  </Link>
                  <Link to='/account/orders' className='flex flex-row items-center gap-2'>
                    <i className='fa-regular fa-clipboard text-base'></i>
                    <span>Orders</span>
                  </Link>
                </>
              ) : (
                <Link
                  to='/login'
                  className='bg-blue-600 hover:bg-blue-700 rounded-lg text-center p-2 text-sm text-slate-200'
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </ul>
      <button className='flex md:hidden text-2xl' onClick={() => setMenuOpen(true)}>
        <i className='fa-solid fa-bars'></i>
      </button>
      <div
        className={
          'absolute flex-col items-center md:hidden w-[60%] h-full z-[999] top-0 right-0 gap-8 animate-open-menu text-white glass-menu ' +
          (menuOpen ? 'flex' : 'hidden')
        }
      >
        <div className='w-full pt-4 flex flex-row items-center content-center justify-center'>
          <p className='text-xl'>Menu</p>
          <button className='flex items-center absolute right-8' onClick={() => setMenuOpen(false)}>
            <i className='fa-solid fa-x text-xl'></i>
          </button>
        </div>
        <ul className='flex flex-col items-center gap-1'>
          <li>
            <a href='/'>Homepage</a>
          </li>
          <Link to='/cart'>
            <li>Cart</li>
          </Link>
          <Link to='/account/orders'>
            <li>Orders</li>
          </Link>
          <Link to='/account/wishlist'>
            <li>Wishlist</li>
          </Link>
          <li>
            <a href='/'>Support</a>
          </li>
        </ul>
        <div className='text-xl'>
          <p>Categories</p>
        </div>
        <ul className='flex flex-col pl-4 gap-1'>
          {categories.map((category) => (
            <a className='w-36' href={'/c/' + category.value} key={category.value}>
              <li className='flex flex-row justify-between items-center'>
                {category.title}
                <i className='fa-solid fa-chevron-right text-xs'></i>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
