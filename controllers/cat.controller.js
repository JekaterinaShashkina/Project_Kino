const db = require("../config/database"); 

const initModels = require("../models/init-models");
const models = initModels(db); 

const Category = models.category

// GET all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json(categories)
    } catch (error) {
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching categories' })  
    }
}

// CREATE a new category
exports.createCategory = async (req, res) => {
    const { catname } = req.body

    if (!catname) {
        return res.status(400).json({ message: 'Category name is required' });
    }
    try {
        const existing = await Category.findOne({ where: { catname } });
        if (existing) {
            return res.status(409).json({ message: 'Category already exists' });
        }
        const category = await Category.create({catname})
        res.status(201).json(category)
    } catch (error) {
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating category' })
    }
}

// Get category information by ID 
exports.getCategoryById = async (req, res) => {   
    const { id } = req.params    
    try {     
        const category = await Category.findByPk(id)      
        if (!category) {       
            return res.status(404).json({ message: `Category with ${id} not found` })      
        }     
        res.status(200).json(category)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while fetching category information' })    
    } 
    }  