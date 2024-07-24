import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { logoutUser } from '../../hooks/useAuth';

const AccountMenu = () => {
  const { user, logout } = useContext(AuthContext);

  async function handleLogout() {
    logoutUser().then((data) => {
      if (data.status) {
        logout();
      }
    });
  }

  return (
    <div className="flex flex-col items gap-2 text-sm">
      {user ? (
        <>
          <p className="text-sm text-center font-medium">{user.user}</p>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg text-center p-2 text-sm text-slate-200"
          >
            Logout
          </button>
          <hr className="h-px mt-2 bg-gray-200 border-0" />
          <Link to="/account" className="flex flex-row items-center gap-2">
            <i className="fa-regular fa-user text-base"></i>
            <span>Account</span>
          </Link>
          <Link to="/account/orders" className="flex flex-row items-center gap-2">
            <i className="fa-regular fa-clipboard text-base"></i>
            <span>Orders</span>
          </Link>
        </>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 rounded-lg text-center p-2 text-sm text-slate-200"
        >
          Log In
        </Link>
      )}
    </div>
  );
};

export default memo(AccountMenu);
