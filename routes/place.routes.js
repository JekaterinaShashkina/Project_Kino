const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');

router.post('/places', /* #swagger.tags = ['Place'] #swagger.description = "Post place"  */
    placeController.createPlace);
router.get('/places', /* #swagger.tags = ['Place'] #swagger.description = "Get all places"  */ placeController.getAllPlaces);
router.get('/places/:id', /* #swagger.tags = ['Place'] #swagger.description = "Get place by ID"  */ placeController.getPlaceById);
router.put('/places/:id', /* #swagger.tags = ['Place'] #swagger.description = "Update place"  */ placeController.updatePlace);
router.delete('/places/:id', /* #swagger.tags = ['Place'] #swagger.description = "Delete place"  */ placeController.deletePlace);

module.exports = router;