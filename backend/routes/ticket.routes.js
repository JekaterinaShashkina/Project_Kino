const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheck');

router.post('/tickets', authMiddleware, checkRole(['User']), /* #swagger.tags = ['Ticket'] #swagger.description = "Create new ticket"  */ ticketController.createTicket);
router.get('/tickets', /* #swagger.tags = ['Ticket'] #swagger.description = "Get all tickets"  */ ticketController.getAllTickets);
router.get('/tickets/:id', /* #swagger.tags = ['Ticket'] #swagger.description = "Get ticket by ID"  */ ticketController.getTicketById);
router.post('/tickets/:id/refund', authMiddleware, checkRole(['User']),
/* #swagger.tags = ['Ticket']
   #swagger.description = "Возврат билета пользователем. Билет можно вернуть только если до начала сеанса осталось более 1 часа."
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID билета',
      required: true,
      type: 'integer'
   }
   #swagger.responses[200] = {
      description: 'Билет успешно возвращён',
      schema: {
        message: 'Ticket refunded successfully',
        ticket: {
          ticketid: 123,
          status: 'refunded'
        }
      }
   }
   #swagger.responses[400] = {
      description: 'Ошибка возврата билета (например, поздно возвращать или билет не активен)',
      schema: { error: 'Refunds are not allowed within 1 hour before the session' }
   }
   #swagger.responses[404] = {
      description: 'Билет не найден',
      schema: { error: 'Ticket not found' }
   }
   #swagger.responses[500] = {
      description: 'Внутренняя ошибка сервера'
   }
*/ 
ticketController.refundTicket);

router.get('/tickets/user/:userid', authMiddleware, checkRole(['User']),/* #swagger.tags = ['Ticket'] #swagger.description = "Get ticket by user ID"  */ ticketController.getTicketsByUser);


module.exports = router;
