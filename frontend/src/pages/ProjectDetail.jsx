//File này sẽ thực hiện các yêu cầu của ngày 12 
// Viết hàm API lấy danh sách task theo projectID 
//hiển thị tasks dưới dạng thẻ hoặc danh sách
//hiển thị các thông tin cơ bản : tiêu đề trạng thái , người phụ trách , hạn chót
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetail() {
  const { projectId } = useParams(); // Lấy ID dự án từ thanh địa chỉ

  // State để lưu danh sách công việc
  // Khai báo biến tasks và hàm setTasks để cập nhật danh sách công việc
  // Giá trị ban đầu là mảng rỗng
  // Khi dữ liệu từ API được tải về, ta sẽ gọi setTasks để cập nhật biến tasks
  // useState là hook của React để quản lý trạng thái trong component hàm 
  // useState trả về một mảng gồm hai phần tử : giá trị trạng thái hiện tại và hàm để cập nhật giá trị đó
  //useState được sử dụng để tạo ra các biến trạng thái (state variables)"hộp chứa" trong component ProjectDetail để lưu trữ danh sách công việc của dự án
  const [tasks, setTasks] = useState([]);
  //Đã thấu hiểu ý nghĩa của useState
  const [loading, setLoading] = useState(true);//loading = true tức là đang tải dữ liệu thì sẽ phải chờ

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');

        //response ở đây chính là đợi phản hồi từ API backend (từ khoá await , axios là thư viện giúp gọi API dễ dàng hơn)
        const response = await axios.get(`http://localhost:5001/api/tasks/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);//cập nhật gía trị mới cho biến tasks , response.data là dữ liệu công việc từ API backend
      } catch (error) {
        console.error("Lỗi lấy danh sách task:", error);
      } finally {
        setLoading(false); // Dữ liệu đã tải xong
      }
    };

    fetchTasks();//Gọi hàm fetchTasks để lấy dữ liệu công việc khi component được render
    //useEffect chạy hàm fetchTasks khi component ProjectDetail được render lần đầu tiên
    // và mỗi khi projectId thay đổi (nghĩa là người dùng chuyển sang xem dự án khác)
  }, [projectId]); // Khi đổi dự án khác, hàm này sẽ chạy lại, đây là cấu trúc dependency array của useEffect [dependency] có học ở ngày 30 / 12 / 2025 trong obsidian

  if (loading) return <p className="p-8">Đang tải danh sách công việc...</p>;//nếu đang tải dữ liệu thì hiển thị dòng chữ này
//nếu không đang tải dữ liệu thì hiển thị giao diện bên dưới
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Danh sách công việc</h1>
      
      {tasks.length === 0 ? (
        <p className="text-gray-500">Dự án này chưa có công việc nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-blue-900">{task.title}</h3>
                {/* Hiển thị Trạng thái với màu sắc */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  task.status === 'done' ? 'bg-green-100 text-green-600' : 
                  task.status === 'doing' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {task.status.toUpperCase()}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
              
              <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Người phụ trách</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {task.assignee_name || "Chưa phân công"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Hạn chót</span>
                  <p className="text-sm font-medium text-red-500">
                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : '---'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}