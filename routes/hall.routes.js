const express = require('express') 
const router = express.Router() 

const hallController = require("../controllers/hall.controller")

router.get('/halls',
    /* #swagger.tags = ['Hall'] #swagger.description = "Get all halls"  */ 
    hallController.getAllHalls
)

router.post('/halls',
    /* #swagger.tags = ['Hall'] #swagger.description = "Post new hall" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        hallname: 'string',
    }
}*/ 
   hallController.createHall
)

// GET category by ID 
router.get('/halls/:id', /* #swagger.tags = ['Hall'] #swagger.description = "Get hall by ID"  */ 
    hallController.getHallById) 

module.exports = router