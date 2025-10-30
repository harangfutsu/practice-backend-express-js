const router = require('express').Router();
const UserControllers = require('../controllers/users.controller');

router.get('/users', UserControllers.getAllUsers); 
router.post('/register', UserControllers.createUser)
router.put('/users/:userId', UserControllers.updateUser)
router.delete('/users/:userId', UserControllers.deleteUser)
router.get('/users/:userId', UserControllers.getUserById)
router.post('/login', UserControllers.loginUser)
router.get('/verify-email', UserControllers.verifyEmail);


module.exports = router;