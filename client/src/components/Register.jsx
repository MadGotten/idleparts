import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../hooks/useAuth';

function Register() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [alert, setAlert] = useState('');

  async function Authenticate(e){
    e.preventDefault()
    registerUser(email,password, password2).then(data => {
        if(data.credentials){
            localStorage.setItem('user', JSON.stringify(data.credentials));
            setUser(data.credentials)
        }
        setAlert(data);
    })
  }
  return (
    <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center gap-4">
            <form className="flex flex-col justify-center items-center gap-4" onSubmit={Authenticate}>
            <div className="block">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
            </label>
            <input 
                type="email" 
                name="email" 
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1" placeholder="you@example.com" 
            />
            </div>
            <div className="block">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Password
            </label>
            <input 
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1" 
            />
            </div>
            <div className="block">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Repeat Password
            </label>
            <input 
                type="password" 
                name="password2" 
                onChange={(e) => setPassword2(e.target.value)}
                required
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1" 
            />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-lg h-9 w-2/3 text-sm text-slate-200">
                Register
            </button>
            </form>
            {alert.message !== undefined && alert.status === "success" ?
                <div className="text-sm text-blue-500">{alert.message}</div> :
                <div className="text-sm text-red-500">{alert.message}</div>
            }
        </div>
    </div>
  )
}

export default Register