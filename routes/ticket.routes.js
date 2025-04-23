const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

router.post('/tickets', ticketController.createTicket);
router.get('/tickets', ticketController.getAllTickets);
router.get('/tickets/:id', ticketController.getTicketById);
router.post('/tickets/:id/refund', ticketController.refundTicket);
router.get('/tickets/user/:userid', ticketController.getTicketsByUser);


module.exports = router;
