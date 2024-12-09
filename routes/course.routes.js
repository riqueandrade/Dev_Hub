const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', courseController.getAllCourses);
router.get('/featured', courseController.getFeaturedCourses);
router.get('/:id', courseController.getCourseById);

// Rotas protegidas
router.use(authMiddleware);
router.post('/', courseController.createCourse);
router.post('/:courseId/enroll', courseController.enrollCourse);
router.put('/:courseId/progress', courseController.updateProgress);

module.exports = router; 