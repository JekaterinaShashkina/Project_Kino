const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheck');

router.get('/reports/sales',
  authMiddleware,
  checkRole(['Manager']),
  /* #swagger.tags = ['Reports']
     #swagger.description = 'Get sold tickets and total income for a specific period'
     #swagger.parameters['from'] = { in: 'query', type: 'string', format: 'date', required: true, description: 'Start date of the report period' }
     #swagger.parameters['to'] = { in: 'query', type: 'string', format: 'date', required: true, description: 'End date of the report period' }
  */
  reportController.getSalesReport
);

module.exports = router;
