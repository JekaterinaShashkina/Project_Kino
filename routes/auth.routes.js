const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register',     /* #swagger.tags = ['User'] #swagger.description = "User sign up" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    username: 'string',
    password: 'password',
    useremail: 'email',
    }
}*/  authController.register);
router.post('/login',     /* #swagger.tags = ['User'] #swagger.description = "User sign in" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    username: 'string',
    password: 'password',
    }
}*/  authController.login);
router.post('/logout',     /* #swagger.tags = ['User'] #swagger.description = "User logout" }*/ authController.logout);

router.post('/add-role',     /* #swagger.tags = ['User'] #swagger.description = "Add role for user" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    "userid": "int",
    "roleid": "int",
    }
}*/  authController.addRoleToUser);
router.post('/remove-role', /* #swagger.tags = ['User'] #swagger.description = "Remove role from user" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    "userid": "int",
    "roleid": "int",
    }
}*/ authController.removeRoleFromUser);



module.exports = router;