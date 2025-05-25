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
      console.error(err); 
      res.status(500).json({ error: 'Error' });
    }
  };
  
  exports.createSession = async (req, res) => {
    const db = require('../config/database');
    const t = await db.transaction();
    try {
        const { starttime, hallid, movieid, price } = req.body;

        if (!starttime || !hallid || !movieid || !price) {
            return res.status(400).json({ error: 'starttime, hallid, movieid, and price are required' });
        }

        // Проверяем существование зала
        const hall = await models.hall.findByPk(hallid, { transaction: t });
        if (!hall) {
            await t.rollback();
            return res.status(400).json({ error: 'Hall not found' });
        }

        // Проверяем существование фильма
        const movie = await models.movie.findByPk(movieid, { transaction: t });
        if (!movie) {
            await t.rollback();
            return res.status(400).json({ error: 'Movie not found' });
        }

        if (isNaN(price) || price <= 0) {
            await t.rollback();
            return res.status(400).json({ error: 'Price must be a number greater than 0' });
        }
        // Создаём новый сеанс
        const newSession = await models.session.create({
            starttime,
            hallid,
            movieid
        }, { transaction: t });

        // Получаем все места в зале
        const places = await models.place.findAll({
            where: { hallid },
            transaction: t
        });

        // Создаём записи цен для всех мест
        const pricePromises = places.map(place =>
            models.price.create({
                sessionid: newSession.sessionid,
                placeid: place.placeid,
                price: price
            }, { transaction: t })
        );
        await Promise.all(pricePromises);

        await t.commit(); 
        res.status(201).json({ message: 'Session and prices created successfully', session: newSession });

    } catch (err) {
        console.error(err);
        await t.rollback(); 
        res.status(500).json({ error: 'Error creating session and prices' });
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