import React from 'react';
//Nếu không import useAuth và useNavigate sẽ không dùng được trong file này, và sẽ hiện màn hình trắng xoá
import { useAuth } from '../context/AuthContext'; // Đường dẫn phải chính xác đến file AuthContext

import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Tổng quan dự án</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <h3 className="text-gray-400 text-sm font-medium uppercase">Tổng số dự án</h3>
          <p className="text-4xl font-black text-blue-900 mt-2">05</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
          <h3 className="text-gray-400 text-sm font-medium uppercase">Task đang làm</h3>
          <p className="text-4xl font-black text-yellow-600 mt-2">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <h3 className="text-gray-400 text-sm font-medium uppercase">Hoàn thành</h3>
          <p className="text-4xl font-black text-green-700 mt-2">08</p>
        </div>
      </div>
    </div>
  );
}