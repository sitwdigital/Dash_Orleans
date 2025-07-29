import React from 'react';
import Logo from '../assets/TXaCkG.tif (4).svg'; // ajuste o caminho conforme sua pasta

const Header = () => {
  return (
    <header className="w-full bg-[#1A67B5] py-6 px-4 rounded-b-xl shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-white text-center">
        <img src={Logo} alt="Logo SITW" className="w-32 md:w-40 mb-2" />
        
      </div>
    </header>
  );
};

export default Header;

