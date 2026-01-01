const pool = require('../config/db');

exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    const manager_id = req.user.id;
    if (!name || name.trim() === "") return res.status(400).json({ error: "Tên dự án không được để trống!" });

    try {
        const sql = 'INSERT INTO projects (name, description, manager_id) VALUES (?, ?, ?)';
        const [result] = await pool.query(sql, [name, description, manager_id]);
        res.status(201).json({ message: "Tạo dự án thành công!", projectId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Lỗi tạo dự án: " + err.message });
    }
};

exports.getProjectsByUser = async (req, res) => {
    try {
        //const { managerId } = req.params;
        const userId = req.user.id; ///Lấy id của user đã được giải mã từ token thông qua middleware authMiddleware  
        console.log("===> Backend đang tìm dự án cho User ID:", userId);
        const [rows] = await pool.query('SELECT * FROM projects WHERE manager_id = ? OR id IN (SELECT project_id FROM tasks WHERE assignee_id = ?)', [userId, userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};