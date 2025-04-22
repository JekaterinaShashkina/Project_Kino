const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');

router.post('/places', placeController.createPlace);
router.get('/places', placeController.getAllPlaces);
router.get('/places/:id', placeController.getPlaceById);
router.put('/places/:id', placeController.updatePlace);
router.delete('/places/:id', placeController.deletePlace);

module.exports = router;