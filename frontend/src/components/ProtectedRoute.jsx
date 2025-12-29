import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();//Gọi đến AuthContext để kiểm tra trạng thái đăng nhập

  if (!user) {
    // Nếu chưa đăng nhập, đá về trang login
    return <Navigate to="/login" />;
  }

  return children;
}