const express = require('express') 
const router = express.Router() 
const categoryController = require('../controllers/cat.controller') 

router.get('/categories',
    /* #swagger.tags = ['Categories'] #swagger.description = "Get all categories"  */ 
    categoryController.getAllCategories)
