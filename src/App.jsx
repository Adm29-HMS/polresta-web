import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import Home from '@/pages/Home';
import Tentang from '@/pages/Tentang';
import Layanan from '@/pages/Layanan';
import Informasi from '@/pages/Informasi';
import Hubungi from '@/pages/Hubungi';
import Statistik from '@/pages/Statistik';
import PID from '@/pages/PID';
import Program from '@/pages/Program';
import ServiceDetail from '@/pages/ServiceDetail';
import Prestasi from '@/pages/Prestasi';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tentang" element={<Tentang />} />
          <Route path="layanan" element={<Layanan />} />
          <Route path="layanan/:slug" element={<ServiceDetail />} />
          <Route path="informasi" element={<Informasi />} />
          <Route path="hubungi" element={<Hubungi />} />
          <Route path="statistik" element={<Statistik />} />
          <Route path="pid" element={<PID />} />
          <Route path="program" element={<Program />} />
          <Route path="prestasi" element={<Prestasi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
