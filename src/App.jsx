import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}
