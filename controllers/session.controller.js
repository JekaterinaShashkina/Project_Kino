const e = require('express');
const db = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(db);
const { Op } = require('sequelize');


exports.getAllSessions = async (req, res) => {
    try {
      const sessions = await models.session.findAll({
        include: [
          { model: models.hall,
            as: 'hall'
           },
          { model: models.movie,
            as: 'movie'
           }
        ]
      });
      res.json(sessions);
    } catch (err) {
      console.error(err); // полезно для отладки
      res.status(500).json({ error: 'Error' });
    }
  };
  
exports.createSession = async (req, res) => {
    try {
        const { starttime, hallid, movieid } = req.body;
  
        if (!starttime || !hallid || !movieid) {
        return res.status(400).json({ error: 'starttime, hallid and movieid are required' });
        }  

        const hall = await models.hall.findByPk(hallid);
        if (!hall) {
        return res.status(400).json({ error: 'Hall not found' });
        }

        const movie = await models.movie.findByPk(movieid);
        if (!movie) {
            return res.status(400).json({ error: 'Movie not found' });
        }

        const newSession = await models.session.create({
            starttime,
            hallid,
            movieid
        });
  
      res.status(201).json({ message: 'Session created', session: newSession });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating session' });
    }
  };

exports.getSessionsByDate = async (req, res) => {
    try {
        const date = req.params.date // format YYYY-MM-DD
        const startDate = new Date(`${date}T00:00:00`)
        const endDate = new Date(`${date}T23:59:59`)

        const sessions = await models.session.findAll({
            where: {
                starttime: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                {model: models.hall, as: 'hall'},
                {model: models.movie, as: 'movie'}
            ]
        })
        res.json(sessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching sessions by date' });
    }
}

exports.getSessionsByMovie = async (req, res) => {
    try {
        const {movieid} = req.params

        const sessions = await models.session.findAll({
            where: {movieid},
            include: [
                {model: models.hall, as: 'hall'},
                {model: models.movie, as: 'movie'}
            ]
        })

        res.json(sessions)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Error fetching sessions by movie'})
    }
}