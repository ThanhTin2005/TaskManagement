# 📋 Task Management System - Backend API

Dự án quản lý công việc và dự án dành cho sinh viên Kỹ thuật máy tính. Hệ thống hỗ trợ quản lý phân quyền (Manager), xác thực người dùng qua JWT và tối ưu truy vấn dữ liệu với MySQL JOIN.

## 🛠 Công nghệ sử dụng
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **Security:** JWT (JSON Web Token), Bcryptjs (Mã hóa mật khẩu)
* **Environment:** dotenv

---

## ⚙️ Hướng dẫn cài đặt

1. **Cài đặt thư viện:**
   ```bash
   npm install

2.Cấu hình biến môi trường
   PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=task_management
JWT_SECRET=bi_mat_du_an_1

3.Khởi động server
node server.js
Server sẽ chạy tại : http://localhost:5001/api

Danh sách các API
1.Xác thực
Chức năng,Phương thức,Endpoint,Yêu cầu Auth,Body (JSON)
Đăng ký,POST,/auth/register,Không,"username, password, full_name, email"
Đăng nhập,POST,/auth/login,Không,"username, password"
Response Login: Trả về token. Hãy đính kèm token này vào Header Authorization: Bearer <token> cho các API bên dưới.

2.Quản lý dự án (Projects)
Chức năng,Phương thức,Endpoint,Yêu cầu Auth,Ghi chú
Tạo dự án mới,POST,/projects,Có,"Body: name, description. manager_id lấy từ Token."
Lấy DS dự án,GET,/projects/:managerId,Không,Lấy tất cả dự án do một User cụ thể quản lý.

3.Quản lý công việc (Tasks)
Chức năng,Phương thức,Endpoint,Yêu cầu Auth,Ghi chú
Tạo Task,POST,/tasks,Có,"Body: project_id, title, description, deadline, assignee_id."
Xem Task theo dự án,GET,/tasks/:projectId,Có,Trả về thông tin task + assignee_name (Dùng JOIN).
Cập nhật Task,PATCH,/tasks/:id,Có,"Body: status, assignee_id. Chỉ Manager dự án mới có quyền.

Cấu trúc thư mục 
├── config/             # Kết nối Database
├── controllers/        # Logic xử lý nghiệp vụ (Brains)
├── middleware/         # Kiểm tra xác thực (JWT)
├── routes/             # Định nghĩa đường dẫn API (Router)
├── .env                # Biến môi trường (Secret)
├── server.js           # File chạy chính
└── README.md           # Tài liệu dự án


Quy định mã lỗi (Status Codes)
200/201: Thành công.
400: Dữ liệu đầu vào không hợp lệ (Thiếu trường bắt buộc).
401: Chưa đăng nhập hoặc Token sai/hết hạn.
403: Không có quyền truy cập (Ví dụ: Bạn không phải Manager của dự án).
500: Lỗi Server nội bộ.