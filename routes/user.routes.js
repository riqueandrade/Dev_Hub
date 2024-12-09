const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.getUserCourses(req.user.id);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cursos do usuário' });
    }
});

module.exports = router; 