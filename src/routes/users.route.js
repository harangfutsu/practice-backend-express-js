const router = require('express').Router();
const UserControllers = require('../controllers/users.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');
// hanya admin yang boleh lihat semua user dan hapus user
router.get('/users', UserControllers.getAllUsers);
router.delete('/users/:userId', UserControllers.deleteUser);
// bisa diakses oleh semua user
router.post('/register', UserControllers.createUser);
router.post('/login', UserControllers.loginUser);
router.get('/verify-email', UserControllers.verifyEmail);
router.put('/users/:userId', UserControllers.updateUser);
router.get('/users/:userId', UserControllers.getUserById);
module.exports = router;
