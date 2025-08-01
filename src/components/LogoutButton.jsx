import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <button
      className="ml-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Sair
    </button>
  );
}