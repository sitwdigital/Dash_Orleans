import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from "./routes/Admin";
import ViewDashboard from "./routes/Viewer";
import Login from "./routes/Login";
import { useEffect, useState } from 'react';
import { supabase } from "./utils/supabase";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUsuario(user);
      setCarregando(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (carregando) return <div className="text-center mt-10">Carregando...</div>;

  return (
    <Routes>
      <Route path="/" element={usuario ? <Admin /> : <Navigate to="/login" />} />
      <Route path="/admin" element={usuario ? <Admin /> : <Navigate to="/login" />} />
      <Route path="/view/:id" element={<ViewDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;