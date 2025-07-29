import { supabase } from '../utils/supabase';
import { v4 as uuidv4 } from 'uuid'; // Certifique-se que você rodou: npm install uuid

export async function shareDashboard(summaryData, groupList) {
  if (!summaryData || !groupList.length) return null;

  const id = uuidv4();

  const { error } = await supabase
    .from('dashboards')
    .insert([
      {
        id,
        summary: summaryData,
        groups: groupList,
      }
    ]);

  if (error) {
    console.error('Erro ao salvar dashboard:', error);
    return null;
  }

  return id;
}

