const router = require('express').Router();

const UserController = require('../../app/controllers/user/UserController');

router.post('/register', UserController.register);

module.exports = router;