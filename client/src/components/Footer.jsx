import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full h-[22rem] bg-blue-600 text-white mt-auto">
      <div className="2xl:container w-full flex flex-col mx-auto h-full p-8 md:py-10 md:px-16 gap-8">
        <div className="grid grid-cols-2 grid-flow-row max-w-6xl gap-8 text-sm sm:gap-4 sm:grid-cols-4 sm:text-base">
          <ul className="flex flex-col gap-2">
            <li className="text-[0.8rem] uppercase font-semibold tracking-wider">Product</li>
            <li>Overview</li>
            <li>Pricing</li>
            <li>Releases</li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="text-[0.8rem] uppercase font-semibold tracking-wider">Company</li>
            <li>About us</li>
            <li>Careers</li>
            <li>News</li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="text-[0.8rem] uppercase font-semibold tracking-wider">Resources</li>
            <li>Newsletter</li>
            <li>Events</li>
            <li>Support</li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="text-[0.8rem] uppercase font-semibold tracking-wider">Social</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Tiktok</li>
          </ul>
        </div>
        <div className="flex flex-row text-sm md:text-base justify-between mt-auto">
          <Link to="/">
            <img src="/logo.svg" alt="logo" className="w-16 h-8" />
          </Link>
          <p className="flex items-center">@ 2024 Idleparts. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
