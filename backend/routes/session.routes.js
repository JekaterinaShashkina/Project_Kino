const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheck');

router.get('/sessions', /* #swagger.tags = ['Session'] #swagger.description = "Get all sessions"  */ 
    sessionController.getAllSessions)

router.post('/sessions', authMiddleware, checkRole(['Admin']), /* #swagger.tags = ['Session'] #swagger.description = "Post new session"  */ 
    sessionController.createSession
)
router.get('/sessions/date/:date', /* #swagger.tags = ['Session'] #swagger.description = "Get sessions by date"  */ 
    sessionController.getSessionsByDate)

router.get('/sessions/movie/:movieid', /* #swagger.tags = ['Session'] #swagger.description = "Get sessions by movie"  */ 
    sessionController.getSessionsByMovie)

router.put('/sessions/:id', authMiddleware, checkRole(['Admin']), /* #swagger.tags = ['Session'] #swagger.description = "Update session"  */
    sessionController.updateSession
)

router.get('/session/:id/full', sessionController.getSessionWithSeats);


module.exports = router;