const db = require('../config/database');
const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const models = initModels(db);

exports.createTicket = async (req, res) => {

  const t = await db.transaction();
  try {
    const { sessionid, placeid, userid } = req.body;

    const [session, place, user] = await Promise.all([
      models.session.findByPk(sessionid),
      models.place.findByPk(placeid),
      models.useraccount.findByPk(userid)
    ]);

    if (!session) return res.status(400).json({ error: 'Session not found' });
    if (!place) return res.status(400).json({ error: 'Place not found' });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const now = new Date();
   
    console.log('now time:', now);
    console.log('seanss time:', new Date(session.starttime));

    if (new Date(session.starttime) < now){
      return res.status(400).json({ error: 'Cannot buy ticket for a past session' });
    }

    const existingTicket = await models.ticket.findOne({
      where: { sessionid, placeid }
    });

    if (existingTicket) {
      return res.status(400).json({ error: 'Ticket for this place and session already exists' });
    }

    const ticket = await models.ticket.create({
      sessionid,
      placeid,
      userid,
      purchasetime: now,
      status: 'active'
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Ticket created', ticket });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await models.ticket.findAll({
      include: [
        {
          model: models.session,
          as: 'session',
          include: [{ model: models.movie, as: 'movie' }]
        },
        {
          model: models.place,
          as: 'place'
        },
        {
          model: models.useraccount,
          as: 'user'
        }
      ]
    });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await models.ticket.findByPk(req.params.id, {
      include: [
        {
          model: models.session,
          as: 'session',
          include: [{ model: models.movie, as: 'movie' }]
        },
        {
          model: models.place,
          as: 'place'
        },
        {
          model: models.useraccount,
          as: 'user'
        }
      ]
    });

    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.refundTicket = async (req, res) => {
  try {
    const ticket = await models.ticket.findByPk(req.params.id, {
      include: [{ model: models.session, as: 'session' }]
    });

    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    if (ticket.status !== 'active') return res.status(400).json({ error: 'Only active tickets can be refunded' });

    const sessionTime = new Date(ticket.session.starttime);
    const now = new Date();
    const oneHourBefore = new Date(sessionTime.getTime() - 60 * 60 * 1000);

    if (now > oneHourBefore) {
      return res.status(400).json({ error: 'Refunds are not allowed within 1 hour before the session' });
    }

    ticket.status = 'refunded';
    await ticket.save();
    res.json({ message: 'Ticket refunded successfully', ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTicketsByUser = async (req, res) => {
    try {
      const { userid } = req.params;
  
      const user = await models.useraccount.findByPk(userid);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const tickets = await models.ticket.findAll({
        where: { userid },
        include: [
          {
            model: models.session,
            as: 'session',
            include: [
              {
                model: models.movie,
                as: 'movie'
              }
            ]
          },
          {
            model: models.place,
            as: 'place'
          }
        ],
        order: [['purchasetime', 'DESC']]
      });
  
      res.status(200).json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get tickets by user' });
    }
  };
  
