import React from 'react';
//Nếu không import useAuth và useNavigate sẽ không dùng được trong file này, và sẽ hiện màn hình trắng xoá
import { useAuth } from '../context/AuthContext'; // Đường dẫn phải chính xác đến file AuthContext

import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { logout } = useAuth();//Lấy hàm logout từ kết qủa trả về của AuthContext , gán vào một biến cùng tên 'logout'
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600">Đây là trang Dashboard</h1>
      <p>Chào mừng Tín đã đăng nhập thành công!</p>
    </div>
  );
}