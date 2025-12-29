import { useAuth } from '../context/AuthContext';
import { useNavigate, Outlet } from 'react-router-dom';

export default function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-700">
          Task Manager
        </div>
        <nav className="flex-1 p-4">
          <h3 className="text-xs uppercase text-blue-300 font-semibold mb-4">Danh sách dự án</h3>
          {/* Tạm thời để tĩnh, Ngày 12 chúng ta sẽ map dữ liệu thật từ API */}
          <ul className="space-y-2">
            <li className="p-2 hover:bg-blue-700 rounded cursor-pointer transition">📁 Dự án Web React</li>
            <li className="p-2 hover:bg-blue-700 rounded cursor-pointer transition">📁 Đồ án Cơ sở dữ liệu</li>
          </ul>
        </nav>
      </aside>

      {/* PHẦN BÊN PHẢI (Topbar + Content) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 2. TOPBAR */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Chào, <span className="font-bold text-blue-600">User</span></span>
            <button 
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium"
            >
              Đăng xuất
            </button>
          </div>
        </header>

        {/* 3. MAIN CONTENT */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          {/* Outlet sẽ là nơi hiển thị nội dung của Dashboard hoặc các trang con khác */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}