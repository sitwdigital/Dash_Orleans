import React, { useState } from 'react';
import Papa from 'papaparse';
import { shareDashboard } from '../services/shareDashboard'; // <-- certifique-se que o caminho esteja correto

const UploadExcel = ({ onDataParsed }) => {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name); // Mostra nome do arquivo

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data;

        const grupos = data
          .map((row) => {
            const nome = row['Nome']?.trim();
            const membros = parseInt(row['Participantes reais']) || 0;
            if (!nome || isNaN(membros)) return null;
            return { nome, membros };
          })
          .filter(Boolean);

        const totalGrupos = grupos.length;
        const totalMembros = grupos.reduce((acc, g) => acc + g.membros, 0);
        const mediaPorGrupo = totalGrupos ? Math.round(totalMembros / totalGrupos) : 0;
        const maiorGrupoObj = grupos.reduce((prev, curr) =>
          curr.membros > prev.membros ? curr : prev,
          { membros: 0, nome: '' }
        );

        const resumo = {
          totalGrupos,
          totalMembros,
          mediaPorGrupo,
          maiorGrupo: maiorGrupoObj.membros,
          cidadeMaiorGrupo: maiorGrupoObj.nome,
        };

        onDataParsed(resumo, grupos);

        try {
          await shareDashboard(resumo, grupos);
          console.log('Dashboard atualizado automaticamente no Supabase!');
        } catch (error) {
          console.error('Erro ao compartilhar automaticamente:', error);
        }
      },
      error: (err) => {
        console.error('Erro ao processar CSV:', err.message);
        alert('Erro ao processar o arquivo CSV.');
      },
    });
  };

  return (
    <div className="mb-6 flex flex-col items-center text-center">
      <label className="w-full max-w-xs">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="w-full file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </label>

      {fileName && (
        <p className="mt-2 text-sm text-gray-600 break-words max-w-xs">
          {fileName}
        </p>
      )}
    </div>
  );
};

export default UploadExcel;