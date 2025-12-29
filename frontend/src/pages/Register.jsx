import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  // Quản lý tất cả các trường trong 1 object để code gọn hơn
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    email: ''
  });

  const navigate = useNavigate();

  // Hàm xử lý khi người dùng nhập liệu
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Gọi API đăng ký từ Backend đã Refactor của bạn
      const response = await axios.post('http://localhost:5001/api/auth/register', formData);

      alert(response.data.message || "Đăng ký thành công!");
      
      // Đăng ký xong thì cho người dùng sang trang Login luôn
      navigate('/login');
    } catch (error) {
      alert("Lỗi đăng ký: " + (error.response?.data?.error || "Có lỗi xảy ra"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Tạo Tài Khoản</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input
              type="text"
              name="full_name"
              placeholder="Nguyễn Văn A"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              placeholder="username123"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-500 text-white font-bold p-3 rounded-lg mt-8 hover:bg-green-600 transition duration-200"
        >
          Đăng Ký Ngay
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Đã có tài khoản? <Link to="/login" className="text-green-600 font-bold hover:underline">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}