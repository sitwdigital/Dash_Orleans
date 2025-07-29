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

  useEffect(() => {
    async function fetchData() {
      if (id) {
        // Buscar do Supabase com os campos corretos
        const { data, error } = await supabase
          .from('dashboards')
          .select('summary, groups')
          .eq('id', id)
          .single();

        if (error || !data) {
          console.error('Erro ao carregar do Supabase:', error);
          setDashboard(null);
        } else {
          setDashboard(data);
        }
      } else {
        // Buscar do localStorage
        const stored = loadDashboard();
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
        />

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

export default Viewer;