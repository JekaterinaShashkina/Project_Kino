const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheck');

router.post('/places', authMiddleware, checkRole(['Admin']), /* #swagger.tags = ['Place'] #swagger.description = "Post place"  */
    placeController.createPlace);
router.get('/places', /* #swagger.tags = ['Place'] #swagger.description = "Get all places"  */ placeController.getAllPlaces);
router.get('/places/:id', /* #swagger.tags = ['Place'] #swagger.description = "Get place by ID"  */ placeController.getPlaceById);
router.put('/places/:id', authMiddleware, checkRole(['Admin']), /* #swagger.tags = ['Place'] #swagger.description = "Update place"  */ placeController.updatePlace);
//router.delete('/places/:id', authMiddleware, checkRole(['Admin']), /* #swagger.tags = ['Place'] #swagger.description = "Delete place"  */ placeController.deletePlace);

router.get('/status/:sessionid',
    /* #swagger.tags = ['Place']
       #swagger.description = 'Get places with status for a specific session'
       #swagger.parameters['sessionid'] = { in: 'path', description: 'Session ID', required: true, type: 'integer' }
    */
    placeController.getPlacesWithStatus
  );

router.get('/places/hall/:hallid', /* #swagger.tags = ['Place'] #swagger.description = "Search places by hallID"  */
  placeController.getPlacesByHallID
)
module.exports = router;