// KIỂM TRA DÒNG NÀY: Phải có Navigate ở đây
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* MainLayout bao bọc Dashboard */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            {/* Khi vào trang chủ "/" sẽ tự chuyển hướng sang "/dashboard" */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;