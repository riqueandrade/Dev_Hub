const db = require('../config/database');

class Course {
    constructor(course) {
        this.id = course.id;
        this.title = course.title;
        this.description = course.description;
        this.duration = course.duration;
        this.level = course.level;
        this.category = course.category;
        this.image = course.image_url;
        this.students = course.students || 0;
        this.is_published = course.is_published;
    }

    static async create(newCourse) {
        const [result] = await db.execute(
            'INSERT INTO courses (title, description, duration, level, category, is_published) VALUES (?, ?, ?, ?, ?, ?)',
            [newCourse.title, newCourse.description, newCourse.duration, newCourse.level, newCourse.category, newCourse.is_published || true]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM courses WHERE is_published = TRUE');
        return rows.map(row => new Course(row));
    }

    static async findFeatured() {
        const [rows] = await db.execute(`
            SELECT c.*, COUNT(e.id) as students
            FROM courses c
            LEFT JOIN enrollments e ON c.id = e.course_id
            WHERE c.is_published = TRUE
            GROUP BY c.id
            ORDER BY students DESC
            LIMIT 3
        `);
        return rows.map(row => new Course(row));
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM courses WHERE id = ? AND is_published = TRUE', [id]);
        return rows[0] ? new Course(rows[0]) : null;
    }

    static async enroll(userId, courseId) {
        // Verificar se o curso está publicado antes de permitir a inscrição
        const [courses] = await db.execute('SELECT id FROM courses WHERE id = ? AND is_published = TRUE', [courseId]);
        if (courses.length === 0) {
            throw new Error('Curso não encontrado ou não está disponível');
        }

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
             WHERE e.user_id = ? AND c.is_published = TRUE`,
            [userId]
        );
        return rows.map(row => new Course(row));
    }
}

module.exports = Course; 