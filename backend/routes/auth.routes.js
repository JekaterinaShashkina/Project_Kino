const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validator = require('../config/validationBody')
const checkRole = require('../middleware/roleCheck');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register',     /* #swagger.tags = ['User'] #swagger.description = "User sign up" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    username: 'string',
    password: 'password',
    useremail: 'email',
    }
}*/validator.createUserValidator,  authController.register);
router.post('/login',     /* #swagger.tags = ['User'] #swagger.description = "User sign in" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    username: 'string',
    password: 'password',
    }
}*/validator.loginValidator,  authController.login);
router.post('/logout',     /* #swagger.tags = ['User'] #swagger.description = "User logout" }*/ authController.logout);

router.post('/add-role', authMiddleware, checkRole(['Manager']),
    
    /* #swagger.tags = ['User'] #swagger.description = "Add role for user" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    "userid": "int",
    "roleid": "int",
    }
}*/  authController.addRoleToUser);
router.post('/remove-role', authMiddleware, checkRole(['Manager']),
    
    /* #swagger.tags = ['User'] #swagger.description = "Remove role from user" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    "userid": "int",
    "roleid": "int",
    }
}*/ authController.removeRoleFromUser);

router.get('/users', authMiddleware, checkRole(['Manager']),/* #swagger.tags = ['User'] #swagger.description = "Get all users"  */ 
    authController.getAllUsers
)



module.exports = router;