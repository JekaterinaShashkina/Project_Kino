const db = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(db);

const { Op } = require('sequelize');


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

  
    if (!title || duration === undefined || !releasedate || rating === undefined || !status || !movielanguage) {
      await t.rollback();
      return res.status(400).json({
        error: 'All fields (title, duration, releasedate, rating, status, movielanguage) are required.'
      });
    }


    if (!Number.isInteger(duration) || duration <= 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Duration must be a positive integer.' });
    }


    const ratingValue = parseFloat(rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 10) {
      await t.rollback();
      return res.status(400).json({ error: 'Rating must be a number between 0 and 10.' });
    }

    if (isNaN(Date.parse(releasedate))) {
      await t.rollback();
      return res.status(400).json({ error: 'Releasedate must be a valid date.' });
    }


    const allowedStatuses = ['Released', 'Processes', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      await t.rollback();
      return res.status(400).json({
        error: `Invalid status. Allowed values are: ${allowedStatuses.join(', ')}`
      });
    }


    if (categoryids && Array.isArray(categoryids)) {
      const existingCategories = await models.category.findAll({
        where: { categoryid: categoryids }
      });

      const existingIds = existingCategories.map(c => c.categoryid);
      const missingIds = categoryids.filter(id => !existingIds.includes(id));

      if (missingIds.length > 0) {
        await t.rollback();
        return res.status(400).json({
          error: `Some categories are not present: ${missingIds.join(', ')}`
        });
      }
    }


    const movie = await models.movie.create({
      title,
      duration,
      releasedate: new Date(releasedate),
      rating: ratingValue,
      status,
      movielanguage
    }, { transaction: t });

    if (categoryids && Array.isArray(categoryids)) {
      await movie.setCategories(categoryids, { transaction: t });
    }

    await t.commit(); 
    res.status(201).json({ message: 'Movie is created', movie });
  } catch (err) {
    await t.rollback(); 
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.updateMovie = async (req, res) => {
  const t = await db.transaction();
  try {
    const movie = await models.movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'movie is not found' });

    const { title, duration, releasedate, rating, status, movielanguage, categoryids } = req.body;
    
    if (!title || duration === undefined || !releasedate || rating === undefined || !status || !movielanguage) {
      await t.rollback();
      return res.status(400).json({
        error: 'All fields (title, duration, releasedate, rating, status, movielanguage) are required.'
      });
    }

    let foundCategories = [];
    if (categoryids && Array.isArray(categoryids)) {
      foundCategories = await models.category.findAll({
        where: { categoryid: categoryids }
      });

      if (foundCategories.length !== categoryids.length) {
        return res.status(400).json({ error: 'One or more category are invalid' });
      }
    }

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
    const categoryNames = foundCategories.map(c => c.catname);
    movie.categorynames = categoryNames;
    await movie.save({ transaction: t });

    await t.commit();
    res.json({ message: 'movie is updated', movie });

  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
};


exports.deleteMovie = async (req, res) => {
  const t = await db.transaction();
  try {
    const movie = await models.movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'movie not found' });

    await models.categorymovie.destroy({ where: { movieid: movie.movieid }, transaction: t });

    await movie.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'movie and its category links deleted' });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const { title, category, releasedateFrom, releasedateTo } = req.query;

    const where = {};
    const include = [];

    if (title) {
      where.title = { [Op.iLike]: `%${title}%` };
    }
    
    if (releasedateFrom || releasedateTo) {
      where.releasedate = {};
      if (releasedateFrom) {
        where.releasedate[Op.gte] = releasedateFrom;
      }
      if (releasedateTo) {
        where.releasedate[Op.lte] = releasedateTo;
      }
    }
    
    if (category) {
      include.push({
        model: models.category,
        where: { catname: { [Op.iLike]: `%${category}%` } },
        through: { attributes: [] }
      });
    }

    const movies = await models.movie.findAll({
      where,
      include
    });

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error while searching movies' });
  }
};


