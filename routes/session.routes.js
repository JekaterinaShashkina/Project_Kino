const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');

router.get('/sessions', /* #swagger.tags = ['Session'] #swagger.description = "Get all sessions"  */ 
    sessionController.getAllSessions)

router.post('/sessions', /* #swagger.tags = ['Session'] #swagger.description = "Post new session"  */ 
    sessionController.createSession
)


module.exports = router;