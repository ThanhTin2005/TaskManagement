const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, projectController.createProject);
router.get('/:managerId', projectController.getProjectsByManager);///Xem được dự án thông qua id của manager chứ k phải id của dự án 

module.exports = router;