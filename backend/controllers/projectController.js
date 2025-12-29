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

exports.getProjectsByManager = async (req, res) => {
    const { managerId } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM projects WHERE manager_id = ?', [managerId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};