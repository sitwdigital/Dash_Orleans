import React, { useState } from 'react';
import { Users } from 'lucide-react';

const getClassificacao = (membros) => {
  if (membros > 500) return { label: 'Grande', color: 'bg-green-500' };
  if (membros >= 200) return { label: 'Médio', color: 'bg-yellow-400' };
  return { label: 'Pequeno', color: 'bg-[#DE2428]' };
};

const ITEMS_PER_PAGE = 8;

function normalizarTexto(texto) {
  return texto
    .normalize('NFD') // separa acentos das letras
    .replace(/[\u0300-\u036f]/g, '') // remove os acentos
    .toLowerCase(); // transforma tudo em minúsculo
}

const GroupCards = ({ grupos, searchTerm, filtro, media }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const gruposFiltrados = grupos
    .filter((g) =>
      normalizarTexto(g.nome).includes(normalizarTexto(searchTerm))
    )
    .filter((g) => {
      if (filtro === 'Ativos') return g.membros >= 10;
      if (filtro === 'Inativos') return g.membros < 10;
      return true;
    });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const gruposPaginados = gruposFiltrados.slice(startIndex, endIndex);

  const totalPages = Math.ceil(gruposFiltrados.length / ITEMS_PER_PAGE);
  const maiorValor = Math.max(...gruposFiltrados.map((g) => g.membros), 1);

  return (
    <div>
      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gruposPaginados.map((grupo, idx) => {
          const { label, color } = getClassificacao(grupo.membros);
          const porcentagem = Math.round((grupo.membros / maiorValor) * 100);

          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border"
            >
              <h3 className="font-semibold text-sm mb-2">{grupo.nome}</h3>

              <span
                className={`text-xs text-white px-2 py-1 rounded-full ${color} `}
              >
                {label}
              </span>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-2xl font-bold">{grupo.membros}</p>
                  <p className="text-sm text-gray-500">membros</p>
                </div>
                <Users size={32} className="text-[#1A67B5]" />
              </div>

              <div className="mt-3 w-full bg-gray-200 h-2 rounded">
                <div
                  className="h-2 rounded bg-green-500"
                  style={{ width: `${porcentagem}% ` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
          >
            ⬅ Anterior
          </button>

          <span className="text-sm mt-2">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded border border-blue-500 text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            Próxima ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupCards;