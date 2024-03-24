import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../components/Login';
import Register from '../../components/Register';
const logoUrl = new URL('../../assets/images/logo.png', import.meta.url).href;

function AuthPage() {
  const [form, setForm] = useState('login');

  const handleFormChange = (formType) => {
    setForm(formType);
  };
  return (
    <div className='flex flex-col justify-center content-center gap-8 p-4 mt-12 mb-12'>
      <div className='flex justify-center'>
        <Link to='/' className='flex flex-row gap-4'>
          <img src={logoUrl} alt='logo' className='w-16 h-8' />
          <h1 className='text-2xl text-blue-600 font-semibold'>Idleparts</h1>
        </Link>
      </div>
      {form === 'login' ? <Login /> : <Register />}
      <button
        onClick={() => handleFormChange('login')}
        className={`${form === 'register' ? 'visible' : 'hidden'} text-sm text-slate-500`}
      >
        I already have an account.&nbsp;
        <span className='text-black font-medium'>Sign me</span>
      </button>
      <button
        onClick={() => handleFormChange('register')}
        className={`${form === 'login' ? 'visible' : 'hidden'} text-sm text-slate-500`}
      >
        I don't have an account.&nbsp;
        <span className='text-black font-medium'>Register me</span>
      </button>
    </div>
  );
}

export default AuthPage;
