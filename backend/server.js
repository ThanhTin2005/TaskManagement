require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Sử dụng Routes (Prefix URL)
app.use('/api/auth', authRoutes);     // Ví dụ: http://localhost:5001/api/auth/login
app.use('/api/projects', projectRoutes); // Ví dụ: http://localhost:5001/api/projects
app.use('/api/tasks', taskRoutes);       // Ví dụ: http://localhost:5001/api/tasks
//Tại MainLayout.jsx gọi API: http://localhost:5001/api/projects/my-projects
//thì sẽ vào projectRoutes.js, tìm route /my-projects và gọi hàm getProjectsByUser trong projectController.js
//Hàm getProjectsByUser sẽ lấy userID từ req.user.id (được gán bởi middleware protect trong authMiddleware.js)


// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Lỗi:", err.message);
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));