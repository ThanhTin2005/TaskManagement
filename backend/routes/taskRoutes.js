const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');//Import cái này để tạo tasks từ tasksController
const { protect } = require('../middleware/authMiddleware');///Import cái này để kiểm tra đăng nhập

///Route của tasks cũng có 3 cái tương ứng với 3 hàm trong controller
router.post('/', protect, taskController.createTask);//Tạo task cũng cần protect vì phải đăng nhập mới được tạo task
router.patch('/:id', protect, taskController.updateTask);
router.get('/:projectId', protect, taskController.getTasksByProject);

module.exports = router;