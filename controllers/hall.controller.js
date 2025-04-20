const db = require("../config/database"); 

const initModels = require("../models/init-models");
const models = initModels(db); 

const Hall = models.hall

// GET all halls
exports.getAllHalls = async (req, res) => {
    try {
        const halls = await Hall.findAll()
        res.status(200).json(halls)
    } catch (error) {
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching halls' })  
    }
}

// CREATE a new hall
exports.createHall = async (req, res) => {
    const { hallname } = req.body

    if (!hallname) {
        return res.status(400).json({ message: 'Hall name is required' });
    }
    try {
        const existing = await Hall.findOne({ where: { hallname } });
        if (existing) {
            return res.status(409).json({ message: 'Hall already exists' });
        }
        const hall = await Hall.create({hallname})
        res.status(201).json(hall)
    } catch (error) {
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating hall' })
    }
}

exports.getHallById = async (req, res) => {   
    const { id } = req.params    
    try {     
        const hall = await Hall.findByPk(id)      
        if (!hall) {       
            return res.status(404).json({ message: `Hall with ${id} not found` })      
        }     
        res.status(200).json(hall)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while fetching hall information' })    
    } 
    }  