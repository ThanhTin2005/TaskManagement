const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, projectController.createProject);
//router.get('/:managerId', projectController.getProjectsByManager);///Xem được dự án thông qua id của manager chứ k phải id của dự án 
// 2. SỬA TẠI ĐÂY: Thay vì /:managerId, hãy dùng một đường dẫn định danh
// Chúng ta thêm 'protect' vào để middleware giải mã token và gán vào req.user
router.get('/my-projects', protect, projectController.getProjectsByUser);

module.exports = router;