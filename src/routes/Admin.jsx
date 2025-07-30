import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import TopBar from '../components/TopBar';
import UploadExcel from '../components/UploadExcel';
import SummaryCards from '../components/SummaryCards';
import GroupCards from '../components/GroupCards';
import Footer from '../components/Footer';

import { shareDashboard } from '../services/shareDashboard';

const Admin = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [fileName, setFileName] = useState('');

  const navigate = useNavigate();

  const handleShare = async () => {
    if (!summaryData || !groupList.length) return;

    const id = await shareDashboard(summaryData, groupList);
    if (id) {
      const link = `${window.location.origin}/view/${id}`;
      try {
        await navigator.clipboard.writeText(link);
        alert('Link copiado:\n' + link);
      } catch {
        prompt('Copie o link manualmente:', link);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-6 bg-gray-100">
        {!summaryData && (
          <div className="w-full max-w-xl mx-auto">
            <div className="text-center mt-28 mb-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-1">
                Insira seu arquivo Excel
              </h2>
              <p className="text-gray-500 text-sm leading-snug">
                Faça o upload da planilha para visualizar as cidades e estatísticas dos grupos.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex gap-3 flex-wrap items-center">
                <UploadExcel
                  onDataParsed={(resumo, grupos, fileName) => {
                    const gruposOrdenados = [...grupos].sort((a, b) => b.membros - a.membros);
                    setSummaryData(resumo);
                    setGroupList(gruposOrdenados);
                    setFileName(fileName || '');
                  }}
                />
              </div>

              {fileName && (
                <span className="text-sm text-gray-700 truncate max-w-full">
                  {fileName}
                </span>
              )}
            </div>
          </div>
        )}

        {summaryData && (
          <div className="max-w-7xl mx-auto w-full">
            <TopBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filtro={filtro}
              setFiltro={setFiltro}
              handleShare={handleShare}
              summaryData={summaryData}
            />

            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex gap-3 flex-wrap items-center">
                <UploadExcel
                  onDataParsed={(resumo, grupos, fileName) => {
                    setSummaryData(resumo);
                    setGroupList(grupos);
                    setFileName(fileName || '');
                  }}
                />
              </div>

              {fileName && (
                <span className="text-sm text-gray-700 truncate max-w-full">
                  {fileName}
                </span>
              )}
            </div>

            <SummaryCards data={summaryData} />

            <GroupCards
              grupos={groupList}
              searchTerm={searchTerm}
              filtro={filtro}
              media={summaryData?.mediaPorGrupo || 0}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
