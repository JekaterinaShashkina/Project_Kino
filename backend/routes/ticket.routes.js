const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheck');

router.post('/tickets', authMiddleware, checkRole(['User']), /* #swagger.tags = ['Ticket'] #swagger.description = "Create new ticket"  */ ticketController.createTicket);
router.get('/tickets', /* #swagger.tags = ['Ticket'] #swagger.description = "Get all tickets"  */ ticketController.getAllTickets);
router.get('/tickets/:id', /* #swagger.tags = ['Ticket'] #swagger.description = "Get ticket by ID"  */ ticketController.getTicketById);
router.post('/tickets/:id/refund', authMiddleware, checkRole(['User']),/* #swagger.tags = ['Ticket'] #swagger.description = ""  */ ticketController.refundTicket);
router.get('/tickets/user/:userid', authMiddleware, checkRole(['User']),/* #swagger.tags = ['Ticket'] #swagger.description = "Get ticket by user ID"  */ ticketController.getTicketsByUser);


module.exports = router;
