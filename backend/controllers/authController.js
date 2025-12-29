const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, full_name, email } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const sql = 'INSERT INTO users (username, password, full_name, email) VALUES (?, ?, ?, ?)';
        await pool.query(sql, [username, hashedPassword, full_name, email]);
        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (err) {
        res.status(500).json({ error: "Lỗi đăng ký: " + err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(401).json({ error: "Tên đăng nhập không tồn tại" });

        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) return res.status(401).json({ error: "Mật khẩu không chính xác" });

        const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: "Đăng nhập thành công!", token });
    } catch (err) {
        res.status(500).json({ error: "Lỗi đăng nhập: " + err.message });
    }
};