// src/components/TaskModal.jsx

export default function TaskModal({ isOpen, onClose, formData, setFormData, onSubmit, isEditing }) {
  // 1. Đảm bảo logic đóng/mở: Nếu isOpen là false thì không vẽ gì cả (trả về null)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-blue-900">
          {isEditing ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
        </h2>
        
        <div className="space-y-4">
          {/* 2. Đảm bảo ràng buộc dữ liệu (Data Binding) cho Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.title} // Nhận từ props
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} // Dùng hàm từ props
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hạn chót</label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {/* 3. Đảm bảo các nút bấm gọi đúng hàm từ props */}
          <button 
            onClick={onClose} // Gọi hàm đóng modal
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Hủy
          </button>
          <button 
            onClick={onSubmit} // Gọi hàm lưu dữ liệu
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </div>
    </div>
  );
}