const express = require('express');
const router = express.Router();
const priceController = require('../controllers/price.controller');

router.get('/prices', /* #swagger.tags = ['Price'] #swagger.description = "Get all prices"  */ priceController.getAllPrices);
router.get('/prices/:id', /* #swagger.tags = ['Price'] #swagger.description = "Get price by ID"  */ priceController.getPriceById);
router.post('/prices', /* #swagger.tags = ['Price'] #swagger.description = "Create new price"  */ priceController.createPrice);
router.put('/prices/:id', /* #swagger.tags = ['Price'] #swagger.description = "Update price"  */ priceController.updatePrice);
router.delete('/prices/:id', /* #swagger.tags = ['Price'] #swagger.description = "Delete price"  */ priceController.deletePrice);

module.exports = router;