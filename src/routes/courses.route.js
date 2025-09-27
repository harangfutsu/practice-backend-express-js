const router = require('express').Router();
const courseControllers = require('../controllers/courses.controller');

router.get('/course', courseControllers.getAllCourse) 
router.get('/course/:id', courseControllers.getCourseById)
router.put('/course/:id', courseControllers.updateCourse)
router.delete('/course/:id', courseControllers.deleteCourse)
router.post('/course', courseControllers.createCourse)

module.exports = router;