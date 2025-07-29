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

        // Corrige colunas que vêm como: { 'Nome': 'xxx', 'Participantes reais': '123' }
        const grupos = data.map(row => ({
          nome: row['Nome']?.trim(),
          membros: parseInt(row['Participantes reais']) || 0
        }));

        const totalGrupos = grupos.length;
        const totalMembros = grupos.reduce((acc, g) => acc + g.membros, 0);
        const mediaPorGrupo = totalGrupos ? Math.round(totalMembros / totalGrupos) : 0;
        const maiorGrupoObj = grupos.reduce((prev, curr) =>
          curr.membros > prev.membros ? curr : prev
        );

        const resumo = {
          totalGrupos,
          totalMembros,
          mediaPorGrupo,
          maiorGrupo: maiorGrupoObj.membros,
          cidadeMaiorGrupo: maiorGrupoObj.nome,
        };

        // Envia para o App.jsx
        onDataParsed(resumo, grupos);
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


