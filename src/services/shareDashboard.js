import { supabase } from '../utils/supabase';

export async function shareDashboard(summaryData, groupList) {
  if (!summaryData || !groupList.length) return null;

  const id = 'orleans-principal'; // ID fixo

  const { error } = await supabase
    .from('dashboards')
    .upsert([
      {
        id,
        summary: summaryData,
        groups: groupList,
      }
    ], {
      onConflict: ['id'] // substitui se já existir
    });

  if (error) {
    console.error('Erro ao salvar dashboard:', error);
    return null;
  }

  return id;
}
