///Tasks controller có 3 hàm : Tạo task , Cập nhật task (từ id của task trong params hay chính là trong url) , Lấy task từ dự án (project_id)
const pool = require('../config/db');

exports.createTask = async (req, res) => {
    const { project_id, title, description, deadline, assignee_id } = req.body;
    if (!title || !project_id) return res.status(400).json({ error: "Tiêu đề và ID dự án là bắt buộc!" });

    try {
        const sql = 'INSERT INTO tasks (project_id, title, description, deadline, assignee_id) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(sql, [project_id, title, description, deadline, assignee_id]);
        res.status(201).json({ message: "Tạo task thành công!", taskId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res, next) => {
    const { id } = req.params;
    const { status, assignee_id } = req.body;
    const userId = req.user.id;

    try {
        const checkSql = `SELECT t.id FROM tasks t JOIN projects p ON t.project_id = p.id WHERE t.id = ? AND p.manager_id = ?`;
        const [taskCheck] = await pool.query(checkSql, [id, userId]);

        if (taskCheck.length === 0) {
            const error = new Error("Bạn không có quyền chỉnh sửa task này hoặc task không tồn tại");
            error.statusCode = 403;
            return next(error);
        }

        let query = 'UPDATE tasks SET ';
        let params = [];
        if (status) { query += 'status = ?, '; params.push(status); }
        if (assignee_id) { query += 'assignee_id = ?, '; params.push(assignee_id); }
        query = query.slice(0, -2) + ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);
        res.json({ message: "Cập nhật thành công!" });
    } catch (err) { next(err); }
};

exports.getTasksByProject = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const sql = `SELECT t.*, u.full_name AS assignee_name FROM tasks t LEFT JOIN users u ON t.assignee_id = u.id WHERE t.project_id = ? ORDER BY t.created_at DESC`;
        const [rows] = await pool.query(sql, [projectId]);
        res.json(rows);
    } catch (err) { next(err); }
};