import { memo } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../assets/constants';

const MobileMenu = ({ menuOpen, setMenuOpen }) => (
  <div
    className={
      'absolute flex-col items-center md:hidden w-[60%] h-full z-[999] top-0 right-0 gap-8 animate-open-menu text-white glass-menu ' +
      (menuOpen ? 'flex' : 'hidden')
    }
  >
    <div className='w-full pt-4 flex flex-row items-center content-center justify-center'>
      <p className='text-xl'>Menu</p>
      <button className='flex items-center absolute right-8' onClick={() => setMenuOpen(!menuOpen)}>
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
);

export default memo(MobileMenu);
