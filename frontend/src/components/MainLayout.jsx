import { useAuth } from '../context/AuthContext';
// KIỂM TRA: Phải import Outlet và Link (nếu dùng Link ở dưới)
import { useNavigate, Outlet, Link } from 'react-router-dom'; 

export default function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-blue-800">
          🚀 Task Manager
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {/* Dùng Link để chuyển trang không bị load lại web */}
            <li className="p-3 hover:bg-blue-800 rounded-lg cursor-pointer transition-all">
               <Link to="/dashboard">📊 Dashboard</Link>
            </li>
            <li className="p-3 hover:bg-blue-800 rounded-lg cursor-pointer transition-all text-blue-200">
               📁 Dự án mẫu 1
            </li>
          </ul>
        </nav>
      </aside>

      {/* NỘI DUNG BÊN PHẢI */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-700">Hệ thống quản lý</h2>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all font-semibold"
          >
            Đăng xuất
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {/* Nơi nội dung của Dashboard sẽ hiển thị */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}