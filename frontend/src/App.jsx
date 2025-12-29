//file này sẽ nhìn lên thanh địa chỉ của trình duyệt để xác định trang nào sẽ hiển thị
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login2';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Nếu người dùng vào trang chủ "/", tự động đẩy sang "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Các tuyến đường chính */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;