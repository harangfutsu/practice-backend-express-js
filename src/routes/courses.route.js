const router = require('express').Router();
const courseControllers = require('../controllers/courses.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');
// semua user bisa melihat & menambah
router.get('/course', verifyToken, courseControllers.getAllCourse);
router.get('/course/:id', verifyToken, courseControllers.getCourseById);
router.post('/course', verifyToken, courseControllers.createCourse);
router.put('/course/:id', verifyToken, courseControllers.updateCourse);
// hanya admin boleh hapus
router.delete('/course/:id', verifyToken, courseControllers.deleteCourse);
module.exports = router;
