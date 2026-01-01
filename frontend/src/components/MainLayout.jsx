//file này đã được cập nhật ngày 12 , thêm logic gọi API lấy danh sách dự án và hiển thị động trong sidebar , chứ k phải cố định như ngày 11
//MainLayout sẽ bao bọc các trang bên trong như Dashboard, ProjectDetail
import { useState, useEffect } from 'react'; // Giữ lại useState, thêm useEffect
import { useAuth } from '../context/AuthContext';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import axios from 'axios';

export default function MainLayout() {
  // 1. Khai báo các State và Hook (GIỮ LẠI HẾT)
  const [projects, setProjects] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 2. Logic Đăng xuất (GIỮ LẠI)
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 3. Logic gọi API Ngày 12 (THÊM MỚI VÀO ĐÂY)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/projects/my-projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        //cái response ta nhận được từ backend chính là danh sách các dự án của user hiện tại (chứa tất cả các thuộc tính có liên quan đến một project)
        
        setProjects(response.data); // Đổ dữ liệu vào biến projects đã khai báo ở trên
      } catch (error) {
        console.error("Lỗi lấy dự án:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR dùng biến projects để hiển thị */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-blue-800">🚀 Task Manager</div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <Link to="/dashboard" className="block p-3 hover:bg-blue-800 rounded-lg mb-4 text-white">📊 Dashboard</Link>
          <h3 className="text-xs uppercase text-blue-400 font-semibold mb-2 px-2">Dự án của tôi</h3>
          <ul className="space-y-1">
            {/* Vòng lặp map dữ liệu động */}
            {projects.map(project => (
              <li key={project.id}>
                <Link to={`/project/${project.id}`} className="block p-3 hover:bg-blue-800 rounded-lg text-sm transition text-blue-100">
                  📁 {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* PHẦN BÊN PHẢI dùng handleLogout cho nút Đăng xuất */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Hệ thống quản lý</h2>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all font-semibold">
            Đăng xuất
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}