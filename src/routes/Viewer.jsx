import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import TopBar from '../components/TopBar';
import SummaryCards from '../components/SummaryCards';
import GroupCards from '../components/GroupCards';
import Footer from '../components/Footer';

import { loadDashboard } from '../utils/storage';
import { supabase } from '../utils/supabase';

const Viewer = () => {
  const { id } = useParams();
  const [dashboard, setDashboard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [updateDate, setUpdateDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const { data, error } = await supabase
          .from('dashboards')
          .select('summary, groups, updated_at')
          .eq('id', id)
          .single();

        if (error || !data) {
          console.error('Erro ao carregar do Supabase:', error);
          setDashboard(null);
        } else {
          // Ordena grupos do maior para o menor número de membros
          data.groups.sort((a, b) => b.membros - a.membros);
          setDashboard(data);

          if (data.updated_at) {
            const formatado = new Date(data.updated_at).toLocaleString('pt-BR', {
              timeZone: 'America/Fortaleza',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            setUpdateDate(formatado.replace(',', ' ÀS') + 'H');
          }
        }
      } else {
        const stored = loadDashboard();
        if (stored?.groups) {
          stored.groups.sort((a, b) => b.membros - a.membros);
        }
        setDashboard(stored);
      }
    }

    fetchData();
  }, [id]);

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Dashboard não encontrado ou expirado.
      </div>
    );
  }

  const { summary, groups } = dashboard;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4 max-w-7xl mx-auto">
        <TopBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          filtro={filtro}
          setFiltro={setFiltro}
          hideShareButton // <- isso remove o botão, precisa tratar esse prop no componente TopBar
        />

        {updateDate && (
          <div className="mt-2 mb-4 text-center md:text-left">
            <div className="inline-block bg-white px-4 py-2 rounded-md shadow text-sm text-gray-600 font-medium border border-gray-200">
              ATUALIZADA EM {updateDate}
            </div>
          </div>
        )}

        <SummaryCards data={summary} />

        <GroupCards 
          grupos={groups} 
          searchTerm={searchTerm} 
          filtro={filtro} 
          media={summary?.mediaPorGrupo || 0}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Viewer;