import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10 py-4 px-6 text-center text-sm text-gray-500">
      <p>
        © {new Date().getFullYear()} Desenvolvido por <strong>SITW</strong>.
        Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
