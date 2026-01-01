const jwt = require('jsonwebtoken');
///Require là hàm để import thư viện , module hoặc file khác vào sử dụng trong file hiện tại

const protect = async (req, res, next) => { ///protect chính là hàm arrow (mũi tên) tượng đương với hàm lambda trong C++
    console.log("===> Có yêu cầu đang đi qua trạm kiểm soát protect!");
    let token; /// let là từ khoá khai báo biến có thể thay đổi được trong js , và chỉ tồn tại trong dấu {}
    /// Vì token ban đầu chưa có giá trị nên sử dụng let để khai báo

    // Kiểm tra xem có token trong header Authorization không
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        ///Header Authorization thường có dạng Bearer <token>
        try {
            // Lấy token từ chuỗi "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];
            ///Hàm split là hàm tách chuỗi thành mảng dựa trên ký tự truyền vào , ở đây là dấu cách ' '

            // Giải mã token (Dùng Secret Key bạn đã tạo ở Ngày 3)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            ///Hàm verify của thư viện jsonwebtoken dùng để giải mã token , nếu token hợp lệ sẽ trả về payload đã mã hoá trong token

            // Gán thông tin user vào request để các hàm sau sử dụng
            req.user = decoded; 
            ///req.user không chỉ là userid hay username mà là toàn bộ thông tin user đã mã hoá trong token bao gồm id, username, email, role,...
            /// Gán thông tin người dùng đã giải mã vào request để các hàm sau có thể sử dụng
            
            next(); // Cho phép đi tiếp
        } catch (error) {
            res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Bạn cần đăng nhập để thực hiện hành động này" });
    }
};

module.exports = { protect };
/// Export hàm protect để sử dụng trong các file khác
///Nếu không có dòng này thì các file khác sẽ không thể sử dụng hàm protect được