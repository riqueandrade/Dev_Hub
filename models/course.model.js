const db = require('../config/database');

class Course {
    constructor(course) {
        this.id = course.id;
        this.title = course.title;
        this.description = course.description;
        this.duration = course.duration;
        this.level = course.level;
        this.category = course.category;
    }

    static async create(newCourse) {
        const [result] = await db.execute(
            'INSERT INTO courses (title, description, duration, level, category) VALUES (?, ?, ?, ?, ?)',
            [newCourse.title, newCourse.description, newCourse.duration, newCourse.level, newCourse.category]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM courses');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM courses WHERE id = ?', [id]);
        return rows[0];
    }

    static async enroll(userId, courseId) {
        await db.execute(
            'INSERT INTO enrollments (user_id, course_id, progress) VALUES (?, ?, 0)',
            [userId, courseId]
        );
    }

    static async getUserCourses(userId) {
        const [rows] = await db.execute(
            `SELECT c.*, e.progress 
             FROM courses c 
             JOIN enrollments e ON c.id = e.course_id 
             WHERE e.user_id = ?`,
            [userId]
        );
        return rows;
    }
}

module.exports = Course; 