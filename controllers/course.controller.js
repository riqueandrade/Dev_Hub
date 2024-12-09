const Course = require('../models/course.model');

exports.createCourse = async (req, res) => {
    try {
        const courseId = await Course.create(req.body);
        res.status(201).json({
            message: 'Curso criado com sucesso',
            courseId
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar curso' });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
};

exports.getFeaturedCourses = async (req, res) => {
    try {
        const courses = await Course.findFeatured();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cursos em destaque' });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Curso não encontrado' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar curso' });
    }
};

exports.enrollCourse = async (req, res) => {
    try {
        await Course.enroll(req.user.id, req.params.courseId);
        res.json({ message: 'Inscrição realizada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar inscrição' });
    }
};

exports.updateProgress = async (req, res) => {
    try {
        const { progress } = req.body;
        await Course.updateProgress(req.user.id, req.params.courseId, progress);
        res.json({ message: 'Progresso atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar progresso' });
    }
}; 