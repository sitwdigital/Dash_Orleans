import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './routes/Admin';
import Viewer from './routes/Viewer';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/view/:id" element={<Viewer />} />
    </Routes>
  );
};

export default App;