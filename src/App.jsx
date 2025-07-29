import { Routes, Route } from 'react-router-dom'; // Removido BrowserRouter
import Admin from "./routes/Admin";
import ViewDashboard from "./routes/Viewer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/view/:id" element={<ViewDashboard />} />
    </Routes>
  );
}

export default App;
