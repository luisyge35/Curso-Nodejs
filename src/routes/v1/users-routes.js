const express = require('express');
const usersController = require('../../controllers/v1/users-controller');
const middleware = require('../../middlewares/auth');

const router = express.Router();

router.post('/create', usersController.createUser);
router.post('/update', middleware.isvalidHostname, middleware.isAuth, usersController.updateUser);
router.post('/delete', middleware.isvalidHostname, middleware.isAuth, middleware.isAdmin, usersController.deleteUser);
router.post('/login', usersController.login);
router.get('/get-all', usersController.getUsers);

module.exports = router;