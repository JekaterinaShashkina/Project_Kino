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


const { QueryTypes } = require('sequelize');

exports.getPlacesWithStatus = async (req, res) => {
  const { sessionid } = req.params;

  console.log('[DEBUG] sessionid from params:', sessionid);

  if (!sessionid || isNaN(sessionid)) {
    console.log('[ERROR] Invalid sessionid:', sessionid);
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  try {
    console.log('[DEBUG] About to query view_places_with_status...');
    const places = await db.query(
      `SELECT * FROM kino.view_places_with_status WHERE sessionid = :sessionid ORDER BY rownumber, seatnumber`,
      {
        replacements: { sessionid },
        type: QueryTypes.SELECT
      }
    );

    console.log('[DEBUG] Query result:', places);

    if (!places || places.length === 0) {
      console.log('[INFO] No places found for session:', sessionid);
      return res.status(404).json({ message: 'No places found for this session' });
    }

    res.json(places);
  } catch (err) {
    console.error('[ERROR] Failed to fetch places with status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

