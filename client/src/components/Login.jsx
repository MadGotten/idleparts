import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../hooks/useAuth';

function Login() {
  const [user, setUser] = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  async function Authenticate(e) {
    e.preventDefault();
    loginUser(email, password).then((data) => {
      if (data.credentials) {
        localStorage.setItem('user', JSON.stringify(data.credentials));
        setUser(data.credentials);
      }
      setAlert(data);
    });
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <form className="flex flex-col justify-center items-center gap-4" onSubmit={Authenticate}>
          <div className="block">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="block">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded-lg h-9 w-2/3 text-sm text-slate-200"
          >
            Login
          </button>
        </form>
        {alert.msg !== undefined && alert.status ? (
          <div className="text-sm text-blue-500">{alert.msg}</div>
        ) : (
          <div className="text-sm text-red-500">{alert.msg}</div>
        )}
      </div>
    </div>
  );
}

export default Login;
