import { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/AuthContext';
import { DialogContext } from '../../context/DialogContext';
import getCsrfToken from '../../hooks/useCsrfToken';

const getUserCredentials = async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
  });
  const data = await response?.json();
  return data.user;
};

const AccountPage = () => {
  const { logout } = useContext(AuthContext);
  const { openDialog } = useContext(DialogContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('********');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const { data } = useQuery(['accountCredentials'], () => getUserCredentials());

  useEffect(() => {
    if (data) {
      setEmail(data);
    }
  }, [data]);

  const editCredentials = async (type) => {
    if (type == 'email') setIsEditingEmail(true);
    else if (type == 'password') setIsEditingPassword(true);
  };

  const updateEmail = async () => {
    openDialog('Are you sure you want to change your email?', async () => {
      try {
        const csrfToken = await getCsrfToken();
        const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
          body: JSON.stringify({ email }),
          credentials: 'include',
        });
        if (response.ok) {
          setIsEditingEmail(false);
          console.log('Email updated successfully');
        } else {
          console.error('Failed to update email');
        }
      } catch (error) {
        console.error('Error updating email:', error);
      }
    });
  };

  const updatePassword = async () => {
    openDialog('Are you sure you want to change your password?', async () => {
      try {
        const csrfToken = await getCsrfToken();
        const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
          body: JSON.stringify({ password }),
          credentials: 'include',
        });
        if (response.ok) {
          setIsEditingPassword(false);
          console.log('Password updated successfully');
        } else {
          console.error('Failed to update password');
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
    });
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    openDialog('Are you sure you want to delete your account?', async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/account`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (response.ok) {
          console.log('Account deleted');
          logout();
        } else {
          console.error('Failed to delete account');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <form className="flex flex-col justify-center items-center gap-4 w-full sm:w-2/3 md:max-w-96">
          <div className="w-full relative">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditingEmail}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1 disabled:focus:ring-0 disabled:focus:border-slate-300"
            />
            <button
              className="absolute top-[34px] right-3 text-sm text-sky-600 font-medium"
              onClick={(e) => {
                e.preventDefault();
                if (isEditingEmail) {
                  updateEmail();
                } else {
                  editCredentials('email');
                }
              }}
            >
              {isEditingEmail ? 'Save' : 'Update'}
            </button>
            {isEditingEmail && (
              <button
                className="absolute top-[34px] right-14 text-sm text-sky-600 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditingEmail(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
          <div className="w-full relative">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditingPassword}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1 disabled:focus:ring-0 disabled:focus:border-slate-300"
            />
            <button
              className="absolute top-[34px] right-3 text-sm text-sky-600 font-medium"
              onClick={(e) => {
                e.preventDefault();
                if (isEditingPassword) {
                  updatePassword();
                } else {
                  editCredentials('password');
                }
              }}
            >
              {isEditingPassword ? 'Save' : 'Update'}
            </button>
            {isEditingPassword && (
              <button
                className="absolute top-[34px] right-14 text-sm text-sky-600 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditingPassword(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        <div>
          <button
            onClick={deleteAccount}
            className="bg-red-600 hover:bg-red-700 rounded-lg h-9 px-2 text-sm text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
