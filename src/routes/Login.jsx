import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro('E-mail ou senha inválidos');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-4 font-bold">Login de Administrador</h1>
      <input
        className="mb-2 p-2 border rounded w-72"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-2 p-2 border rounded w-72"
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleLogin}
      >
        Entrar
      </button>
    </div>
  );
}