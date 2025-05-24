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

exports.getSessionById = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await models.session.findByPk(id, {
            include: [
                { model: models.hall, as: 'hall' },
                { model: models.movie, as: 'movie' }
            ]
        });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching session by ID' });
    }
};

exports.getSessionWithSeats = async (req, res) => {
    const { id } = req.params;
    try {
        // Получаем сессию с залом и фильмом
        const session = await models.session.findOne({
            where: { sessionid: id },
            include: [
                { model: models.hall, as: 'hall' },
                { model: models.movie, as: 'movie' }
            ]
        });

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Получаем места в этом зале
        const seats = await models.place.findAll({
            where: { hallid: session.hallid },
            attributes: ['placeid', 'rownumber', 'seatnumber']
        });

        // Получаем забронированные места для этой сессии
        const bookedSeats = await models.ticket.findAll({
            where: { sessionid: id },
            attributes: ['placeid']
        });

        const bookedSeatIds = bookedSeats.map(t => t.placeid);

        // Получаем цены для данной сессии
        const prices = await models.price.findAll({
            where: { sessionid: id },
            attributes: ['placeid', 'price']
        });

        const priceMap = {};
        prices.forEach(p => {
            priceMap[p.placeid] = p.price;
        });

        // Составляем список мест с их статусом и ценой
        const seatsWithStatus = seats.map(seat => ({
            placeid: seat.placeid,
            rownumber: seat.rownumber,
            seatnumber: seat.seatnumber,
            isBooked: bookedSeatIds.includes(seat.placeid),
            price: priceMap[seat.placeid] || null  // цена, если есть
        }));

        // Отправляем всё в ответе
        res.json({
            session,
            seats: seatsWithStatus
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching session with seats and prices' });
    }
};




exports.updateSession = async (req, res) => {
    const { id } = req.params    
    const { starttime, hallid, movieid } = req.body    
    try {     
        const session = await models.session.findByPk(id)      
        if (!session) {       
            return res.status(404).json({ message: 'Session not found' })      
        }     
        if (hallid !== undefined) {
            const hall = await models.hall.findByPk(hallid);
            if (!hall) {
              return res.status(400).json({ error: 'Hall not found' });
            }
            session.hallid = hallid;
          }
        if (movieid !== undefined) {
        const movie = await models.movie.findByPk(movieid);
        if (!movie) {
            return res.status(400).json({ error: 'Movie not found' });
        }
        session.movieid = movieid;
        }  
        if (starttime !== undefined) {
            session.starttime = starttime; // строкой в формате 'YYYY-MM-DD HH:mm:ss'
        }
        await session.save()      
        
        res.status(200).json({ message: 'Session updated', session })    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ error: 'An error occurred while updating session' })    
    } 
}