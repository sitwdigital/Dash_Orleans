import React from 'react';
import Papa from 'papaparse';

const UploadExcel = ({ onDataParsed }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;

        // Filtra apenas nome e participantes reais
        const grupos = data
          .map((row) => {
            const nome = row['Nome']?.trim();
            const membros = parseInt(row['Participantes reais']) || 0;

            if (!nome || isNaN(membros)) return null;
            return { nome, membros };
          })
          .filter(Boolean); // remove linhas inválidas

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
      },
      error: (err) => {
        console.error('Erro ao processar CSV:', err.message);
        alert('Erro ao processar o arquivo CSV.');
      },
    });
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />
    </div>
  );
};

export default UploadExcel;
