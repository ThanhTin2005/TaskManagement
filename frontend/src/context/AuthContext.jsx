//file này dùng để quản lý trạng thái xác thực người dùng trong ứng dụng React
// Sử dụng Context API để cung cấp thông tin xác thực cho toàn bộ ứng dụng
//ví dụ dashboard cần biết người dùng đã đăng nhập hay chưa để hiển thị thông tin phù hợp

import { createContext, useState, useEffect, useContext } from 'react';
//Nhớ lại buổi hôm trước , phân biệt default export và export thông thường
//Export thông thường thì khi import phải đặt trong dấu {}
//Còn default export thì khi import không cần dấu {}
//ở dòng này là import các hàm từ react để tạo context và quản lý state

const AuthContext = createContext();
//Tạo một context mới để lưu trữ thông tin xác thực
//AuthContext sẽ được sử dụng để cung cấp và tiêu thụ thông tin xác thực trong toàn bộ ứng dụng

export const AuthProvider = ({ children }) => {//đây là viết hàm AuthProvider và export để file khác có thể dùng
  const [user, setUser] = useState(null);
  //user lưu thông tin người dùng hiện tại , null nghĩa là chưa đăng nhập
  //user = null + kết quả của hàm setUser 
  //setUser là hàm để cập nhật thông tin user khi đăng nhập hoặc đăng xuất
  const [loading, setLoading] = useState(true);
  //loading để theo dõi trạng thái tải thông tin xác thực ban đầu
  //ban đầu đặt là true vì khi mở ứng dụng cần kiểm tra xem người dùng đã đăng nhập hay chưa
  //Khi kiểm tra xong sẽ đặt loading thành false
  //để biết khi nào có thể hiển thị giao diện ứng dụng

  useEffect(() => {
    //useEffect có ý nghĩa là  
    // Kiểm tra xem có token trong máy không khi vừa mở web
    const token = localStorage.getItem('token');
    if (token) {
      // Ở đây bạn có thể gọi API /me để lấy thông tin user thật từ token
      // Tạm thời chúng ta giả định là đã đăng nhập nếu có token
      setUser({ loggedIn: true }); 
    }
    setLoading(false);//Đã kiểm tra xong 
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ loggedIn: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    //AuthProvider cung cấp thông tin user , login , logout , loading cho toàn bộ ứng dụng con bên trong nó(children)
    <AuthContext.Provider value={{ user, login, logout, loading }}> 
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook tùy chỉnh để dùng nhanh AuthContext
export const useAuth = () => useContext(AuthContext);