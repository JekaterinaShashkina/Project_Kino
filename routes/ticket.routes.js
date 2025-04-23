const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

router.post('/tickets', /* #swagger.tags = ['Ticket'] #swagger.description = "Create new ticket"  */ ticketController.createTicket);
router.get('/tickets', /* #swagger.tags = ['Ticket'] #swagger.description = "Get all tickets"  */ ticketController.getAllTickets);
router.get('/tickets/:id', /* #swagger.tags = ['Ticket'] #swagger.description = "Get ticket by ID"  */ ticketController.getTicketById);
router.post('/tickets/:id/refund', /* #swagger.tags = ['Ticket'] #swagger.description = ""  */ ticketController.refundTicket);
router.get('/tickets/user/:userid', /* #swagger.tags = ['Ticket'] #swagger.description = "Get ticket by user ID"  */ ticketController.getTicketsByUser);


module.exports = router;
