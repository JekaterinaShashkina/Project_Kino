const express = require('express') 
const router = express.Router() 

const categoryController = require('../controllers/cat.controller') 
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheck')

router.get('/categories',
    /* #swagger.tags = ['Categories'] #swagger.description = "Get all categories"  */ 
    categoryController.getAllCategories
)

router.post('/categories',authMiddleware, checkRole(['Admin']),
    /* #swagger.tags = ['Categories'] #swagger.description = "Post new category" #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
        catname: 'string',
    }
}*/ 
   categoryController.createCategory
)

// GET category by ID 
router.get('/categories/:id', /* #swagger.tags = ['Categories'] #swagger.description = "Get category by ID"  */ 
    categoryController.getCategoryById)
    
router.put('/categories/:id', authMiddleware, checkRole(['Admin']), /* #swagger.tags = ['Categories'] #swagger.description = "Update category"  */ 
    categoryController.updateCategory)

module.exports = router

