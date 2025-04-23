const express = require('express');
const router = express.Router();
const priceController = require('../controllers/price.controller');

router.get('/prices', priceController.getAllPrices);
router.get('/prices/:id', priceController.getPriceById);
router.post('/prices', priceController.createPrice);
router.put('/prices/:id', priceController.updatePrice);
router.delete('/prices/:id', priceController.deletePrice);

module.exports = router;