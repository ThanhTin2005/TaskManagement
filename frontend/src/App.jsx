// KIỂM TRA DÒNG NÀY: Phải có Navigate ở đây
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail'; // Chúng ta sẽ tạo file này ở Bước 2

function App() {
  return (
    <AuthProvider> {/* Tất cả đều phải được kiểm tra đăng nhập đã rồi mới được hiển thị*/}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* MainLayout bao bọc Dashboard */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            {/* Khi vào trang chủ "/" sẽ tự chuyển hướng sang "/dashboard" */}
            {/*Dashboard sẽ sử dụng component MainLayout, component là những thành phần có thể tái sử dụng
            ở đây , componet mainlayout chứa toolbar và sidebar , và mainlayout sẽ bao bọc ngoài dashboard 
            .Ngoài ra , dashboard cũng cần phải được kiểm tra đăng nhập trước khi hiển thị nên bao bọc ngoài bởi ProtectedRoute */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;