
//Khai báo thư viện
const mysql = require('mysql2/promise');
require('dotenv').config();

//Tạo một Connection Pool để quản lý các kết nối đến csdl
//Thay vì 1 kết nối đơn lẻ , Pool cho phép tạo sẵn nhiều kết nối
//Để xử lý nhiều người dùng cùng lúc một các hiệu quả
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, //Số kết nối tối đa trong Pool
  queueLimit: 0, //0 nghĩa là không giới hạn số lượng kết nối chờ
});

// 3. Xuất (export) để các file khác (như server.js) có thể sử dụng
module.exports = pool;
