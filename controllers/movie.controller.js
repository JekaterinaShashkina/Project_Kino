const db = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(db);


exports.getAllMovies = async (req, res) => {
  try {
    const movies = await models.movie.findAll({
      include: [{ model: models.category, through: { attributes: [] } }]
    });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await models.movie.findByPk(req.params.id, {
      include: [{ model: models.category, through: { attributes: [] } }]
    });

    if (!movie) return res.status(404).json({ error: 'Movie is not found' });

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'error' });
  }
};


exports.createMovie = async (req, res) => {
  const t = await db.transaction(); 
  try {
    const { title, duration, releasedate, rating, status, movielanguage, categoryids } = req.body;

    const movie = await models.movie.create({
      title,
      duration,
      releasedate,
      rating,
      status,
      movielanguage
    }, { transaction: t });

    if (categoryids && Array.isArray(categoryids)) {
      await movie.setCategories(categoryids, { transaction: t });
    }

    await t.commit(); 
    res.status(201).json({ message: 'movie is created', movie });
  } catch (err) {
    await t.rollback(); 
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
};


exports.updateMovie = async (req, res) => {
  const t = await db.transaction();
  try {
    const movie = await models.movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'movie is not found' });

    const { title, duration, releasedate, rating, status, movielanguage, categoryids } = req.body;

    await movie.update({
      title,
      duration,
      releasedate,
      rating,
      status,
      movielanguage
    }, { transaction: t });

    if (categoryids && Array.isArray(categoryids)) {
      await movie.setCategories(categoryids, { transaction: t });
    }

    await t.commit();
    res.json({ message: 'movie is updated', movie });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await models.movie.findByPk(req.params.id);

    if (!movie) return res.status(404).json({ error: 'error' });


    await movie.setCategories([]); 

    await movie.destroy();

    res.json({ message: 'movie with catemory movie is deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
};

