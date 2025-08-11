import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { REGIOES } from "../constants/regioes"; // <- novo

const TopBar = ({
  searchTerm,
  setSearchTerm,
  filtro,
  setFiltro,
  regiao,          // <- novo
  setRegiao,       // <- novo
  handleShare,
  summaryData,
  hideShareButton = false,
}) => {
  const location = useLocation();
  const isViewer = location.pathname.startsWith("/view");

  // Opções do seletor de região
  const regioesOptions = ["Todas as regiões", ...Object.keys(REGIOES)];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex w-full flex-col md:flex-row gap-4 md:items-center md:w-3/4">
        {/* Busca por cidade */}
        <input
          type="text"
          placeholder="🔍 Buscar cidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filtro de grupos */}
        <select
          className="w-full md:w-1/5 px-4 py-2 border rounded-md"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="Todos">Todos os grupos</option>
          <option value="Ativos">Ativos</option>
          <option value="Inativos">Inativos</option>
        </select>

        {/* Filtro por região (novo) */}
        <select
          className="w-full md:w-2/5 px-4 py-2 border rounded-md"
          value={regiao}
          onChange={(e) => setRegiao(e.target.value)}
        >
          {regioesOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
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