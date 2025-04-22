const db = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(db);

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
  