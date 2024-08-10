import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

const HelpCenter = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user ? user.user : '');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const SendMessage = (e) => {
    e.preventDefault();
    console.log('Email sent');
  };

  return (
    <div>
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold">Help Center</h1>
        <form
          onSubmit={SendMessage}
          className="flex flex-col items-start gap-4 w-full sm:w-2/3 md:max-w-96"
        >
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1"
            placeholder="Name"
          ></input>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1"
            placeholder="Email"
          ></input>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1"
            placeholder="Phone (optional)"
          ></input>
          <textarea
            name="message"
            maxLength="1000"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 px-3 py-2 bg-white border resize-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm sm:text-base focus:ring-1"
            placeholder="Message"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded-lg h-9 px-2 text-sm text-white"
          >
            Send a message
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;
