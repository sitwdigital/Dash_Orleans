import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import TopBar from '../components/TopBar';
import SummaryCards from '../components/SummaryCards';
import GroupCards from '../components/GroupCards';
import Footer from '../components/Footer';

import { supabase } from '../utils/supabase';

const Viewer = () => {
  const { id } = useParams();
  const [dashboard, setDashboard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [updateDate, setUpdateDate] = useState(null);

  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  const senhaCorreta = 'marcus';

  useEffect(() => {
    if (!autenticado || !id) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      const { data, error } = await supabase
        .from('dashboards')
        .select('summary, groups, updated_at')
        .eq('id', id)
        .single()
        .abortSignal(signal);

      if (error || !data) {
        console.error('Erro ao carregar do Supabase:', error);
        setDashboard(null);
      } else {
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
    }

    fetchData();
    return () => controller.abort();
  }, [id, autenticado]);

  if (!autenticado) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Acesso Protegido</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          className="px-4 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={senhaDigitada}
          onChange={(e) => setSenhaDigitada(e.target.value)}
        />
        <button
          onClick={() => {
            if (senhaDigitada === senhaCorreta) {
              setAutenticado(true);
            } else {
              alert('Senha incorreta!');
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </div>
    );
  }

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
          hideShareButton
        />

        {updateDate && (
          <div className="mt-2 mb-4 text-center md:text-left">
            <div className="inline-block bg-white px-4 py-2 rounded-md shadow text-sm text-gray-600 font-medium border border-gray-200">
              ATUALIZADA EM {updateDate}
            </div>
          </div>
        )}

        {/* grupos juntos no data */}
        <SummaryCards data={{ ...summary, grupos: groups }} />

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