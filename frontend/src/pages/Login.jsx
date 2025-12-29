//File này có 3 phần chính : 
//1.Khai báo công cụ 
//2.Xử lý logic
//3.Tạo giao diện

import { useState } from 'react';
//react giúp tạo các component giao diện và quản lý trạng thái của các component
//useState tạo ra các biến trạng thái (state variables)"hộp chứa" trong component Login để lưu trữ tên đăng nhập và mật khẩu người dùng nhập vào
import axios from 'axios';//axios là thư viện JS giúp frontend gọi API backend dễ dàng hơn
import { useNavigate, Link } from 'react-router-dom';//react - router - dom giúp chuyển đổi giữa các component mà không phải load lại cả trang web
import { useAuth } from '../context/AuthContext';

export default function Login() {
  //Export default là file khác có thể import và sử dụng 
  //Export default mỗi file chỉ có 1 export default duy nhất , khi import không cần dấu ngoặc {}
  //Exprt default thường dùng cho các component chính của file , ở đây là component Login
  const [username, setUsername] = useState('');
  //Đây là cú pháp destructuring - tái cấu trúc 
  //có ý nghĩa là tạo biến trạng thái username và hàm setUsername để cập nhật giá trị của username , giá trị ban đầu là chuỗi nằm trong useState , chính là chuỗi rỗng '
  const [password, setPassword] = useState('');
  //Tạo biến trạng thái password và hàm setPassword để cập nhật giá trị của password , giá trị ban đầu là chuỗi rỗng '
  const navigate = useNavigate();
  // 2. Lấy hàm login từ AuthContext
  const { login } = useAuth();

  //Đây là bộ não của hàm login - xử lý logic khi người dùng nhấn nút đăng nhập
  const handleLogin = async (e) => {//e là event object , là sự kiện được kích hoạt khi người dùng nhấn nút submit trong form , chính là tham số được truyền vào hàm
    //async vì trong hàm có sử dụng từ khóa await để chờ phản hồi từ API backend
    e.preventDefault();//dòng này có ý nghĩa giúp chặn các hành vi mặc định của trình duyệt : reload trang khi nhấn nút submit ,làm mất trạng thái usestate trong React
    try {
      // 1. Gọi API Auth từ Backend
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        username,
        password
      });//phần bên trong {} chính là body của request gửi lên backend

      // 2. Xử lý lưu JWT vào localStorage
      //localStorage.setItem('token', response.data.token);
      login(response.data.token);
      //Nếu đăng nhập đúng , backend sẽ trả về JWT trong response.data.token
      //'token' là key để lưu trữ token trong localStorage(là bộ nhớ của trình duyệt)
      alert("Đăng nhập thành công!");//alert là hàm hiển thị hộp thoại thông báo đơn giản trong trình duyệt

      // 3. Điều hướng vào /dashboard
      navigate('/dashboard');//navigate là hàm từ useNavigate giúp chuyển hướng người dùng đến trang /dashboard sau khi đăng nhập thành công
    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.error || "Đăng nhập thất bại"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Khi người dùng nhấn nút submit trong form , thì sẽ gọi đến hàm handleLogin và gọi đến API của backend */}
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Đăng Nhập</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập" /*place holder : chữ lúc mặc định*/ 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setUsername(e.target.value)}
          /*mỗi khi gõ một ký tự sẽ kích hoạt hàm setUsername để cập nhật dữ liệu vào "hộp chứa" ở trên  */
          /*cách dữ liệu được nhập lưu vào biến state : gọi đến hàm setUsername ở đầu file */
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Đăng Nhập
        </button>
        <p className="mt-4 text-center text-sm">
          Chưa có tài khoản? <Link to="/register" className="text-blue-500">Đăng ký ngay</Link>
           
        </p>
      </form>
    </div>
  );
}