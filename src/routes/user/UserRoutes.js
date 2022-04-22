const router = require('express').Router();

const UserController = require('../../app/controllers/user/UserController');

// Middleware
const verifyToken = require('../../app/helpers/verifyToken');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);

router.patch('/edit/:id', verifyToken, UserController.update);

module.exports = router;