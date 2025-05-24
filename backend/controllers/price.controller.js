const db = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(db);

exports.getAllPrices = async (req, res) => {
  try {
    const prices = await models.price.findAll({
      include: ['session', 'place']
    });
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPriceById = async (req, res) => {
  try {
    const price = await models.price.findByPk(req.params.id, {
      include: ['session', 'place']
    });
    if (!price) return res.status(404).json({ error: 'Price not found' });

    res.json(price);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createPrice = async (req, res) => {
  try {
    const { price, sessionid, placeid } = req.body;

    const session = await models.session.findByPk(sessionid);
    if (!session) return res.status(400).json({ error: 'Session does not exist' });

    const place = await models.place.findByPk(placeid);
    if (!place) return res.status(400).json({ error: 'Place does not exist' });
   
    if (!price || price <= 0) {
      return res.status(400).json({ error: 'Price must be greater than 0' });
    }
    const newPrice = await models.price.create({ price, sessionid, placeid });
    res.status(201).json({ message: 'Price created', newPrice });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePrice = async (req, res) => {
  try {
    const { price, sessionid, placeid } = req.body;
    const priceEntry = await models.price.findByPk(req.params.id);
    if (!priceEntry) return res.status(404).json({ error: 'Price not found' });

    const session = await models.session.findByPk(sessionid);
    if (!session) return res.status(400).json({ error: 'Session does not exist' });

    const place = await models.place.findByPk(placeid);
    if (!place) return res.status(400).json({ error: 'Place does not exist' });

    if (!price || price <= 0) {
      return res.status(400).json({ error: 'Price must be greater than 0' });
    }
    await priceEntry.update({ price, sessionid, placeid });
    res.json({ message: 'Price updated', price: priceEntry });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePrice = async (req, res) => {
  try {
    const price = await models.price.findByPk(req.params.id);
    if (!price) return res.status(404).json({ error: 'Price not found' });

    await price.destroy();
    res.json({ message: 'Price deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
