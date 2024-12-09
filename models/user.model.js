const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }

    static async create(newUser) {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [newUser.name, newUser.email, hashedPassword]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT id, name, email FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async updateProgress(userId, courseId, progress) {
        await db.execute(
            'UPDATE enrollments SET progress = ? WHERE user_id = ? AND course_id = ?',
            [progress, userId, courseId]
        );
    }
}

module.exports = User; 