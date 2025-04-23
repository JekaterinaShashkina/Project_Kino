const db = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(db);

exports.getAllPlaces = async (req, res) => {
  try {
    const places = await models.place.findAll({
      include: [{ model: models.hall, as: 'hall' }]
    });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.getPlaceById = async (req, res) => {
  try {
    const place = await models.place.findByPk(req.params.id, {
      include: [{ model: models.hall, as: 'hall' }]
    });
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.createPlace = async (req, res) => {
  try {
    const { rownumber, seatnumber, hallid } = req.body;

    const hall = await models.hall.findByPk(hallid);
    if (!hall) return res.status(400).json({ error: 'Invalid hall ID' });

    const newPlace = await models.place.create({
      rownumber,
      seatnumber,
      hallid
    });
    res.status(201).json({ message: 'Place created', place: newPlace });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const place = await models.place.findByPk(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });

    const { rownumber, seatnumber, hallid } = req.body;

    if (hallid) {
      const hall = await models.hall.findByPk(hallid);
      if (!hall) return res.status(400).json({ error: 'Invalid hall ID' });
    }

    await place.update({ rownumber, seatnumber, hallid });
    res.json({ message: 'Place updated', place });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const place = await models.place.findByPk(req.params.id);
    if (!place) return res.status(404).json({ error: 'Place not found' });

    await place.destroy();
    res.json({ message: 'Place deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};
