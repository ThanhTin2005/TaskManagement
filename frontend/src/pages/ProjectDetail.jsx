import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TaskModal from '../components/TaskModal'; // Đảm bảo bạn đã tạo file này

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- BỔ SUNG STATE CHO NGÀY 13 ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // null = thêm mới, !null = đang sửa
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    status: 'todo', 
    assignee_name: '', 
    deadline: '' 
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  // 1. Lấy danh sách Task (Read)
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/tasks/${projectId}`, { headers });
      setTasks(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách task:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  // 2. Mở modal để Thêm mới
  const handleOpenCreate = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', status: 'todo', assignee_name: '', deadline: '' });
    setIsModalOpen(true);
  };

  // 3. Mở modal để Chỉnh sửa
  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      assignee_name: task.assignee_name || '',
      deadline: task.deadline ? task.deadline.split('T')[0] : '' // Format lại ngày để hiện trong input date
    });
    setIsModalOpen(true);
  };

  // 4. Xử lý Lưu (Thêm hoặc Sửa)
  const handleSubmit = async () => {
    try {
      if (editingTask) {
        // API Sửa Task
        await axios.put(`http://localhost:5001/api/tasks/${editingTask.id}`, formData, { headers });
      } else {
        // API Thêm Task (truyền kèm projectId)
        await axios.post(`http://localhost:5001/api/tasks/${projectId}`, formData, { headers });
      }
      setIsModalOpen(false);
      fetchTasks(); // Tải lại danh sách sau khi lưu
    } catch (error) {
      alert("Lỗi khi lưu công việc!");
    }
  };

  // 5. Xử lý Xóa (Có xác nhận - Nhiệm vụ 3)
  const handleDelete = async (taskId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này không?")) {
      try {
        await axios.delete(`http://localhost:5001/api/tasks/${taskId}`, { headers });
        setTasks(tasks.filter(t => t.id !== taskId)); // Cập nhật UI ngay lập tức
      } catch (error) {
        alert("Lỗi khi xóa công việc!");
      }
    }
  };

  if (loading) return <p className="p-8 text-center">Đang tải công việc...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách công việc</h1>
        {/* NÚT THÊM TASK MỚI */}
        <button 
          onClick={handleOpenCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Thêm công việc
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Dự án này chưa có công việc nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-blue-900">{task.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.status === 'done' ? 'bg-green-100 text-green-600' : 
                    task.status === 'doing' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {task.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs text-gray-500">
                    <p>Phụ trách: <b>{task.assignee_name || "Chưa có"}</b></p>
                    <p>Hạn: <span className="text-red-500">{task.deadline ? new Date(task.deadline).toLocaleDateString() : '---'}</span></p>
                  </div>
                </div>

                {/* NÚT SỬA VÀ XÓA */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenEdit(task)}
                    className="flex-1 py-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition text-sm"
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(task.id)}
                    className="flex-1 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition text-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMPONENT MODAL DÙNG CHUNG */}
      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditing={!!editingTask}
      />
    </div>
  );
}