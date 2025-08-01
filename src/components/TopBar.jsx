import React from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const TopBar = ({
  searchTerm,
  setSearchTerm,
  filtro,
  setFiltro,
  handleShare,
  summaryData,
  hideShareButton = false,
}) => {
  const location = useLocation();
  const isViewer = location.pathname.startsWith('/view');

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex w-full flex-col md:flex-row gap-4 md:items-center md:w-3/4">
        <input
          type="text"
          placeholder="🔍 Buscar cidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          className="w-full md:w-1/3 px-4 py-2 border rounded-md"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="Todos">Todos os grupos</option>
          <option value="Ativos">Ativos</option>
          <option value="Inativos">Inativos</option>
        </select>
      </div>

      <div className="flex gap-2 items-center">
        {!hideShareButton && (
          <button
            onClick={handleShare}
            disabled={!summaryData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
          >
            📤 Compartilhar
          </button>
        )}

        {/* Só mostra o botão Sair se NÃO estiver na rota /view */}
        {!isViewer && <LogoutButton />}
      </div>
    </div>
  );
};

export default TopBar;