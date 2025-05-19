const jwt = require('jsonwebtoken');
const db = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(db);

require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

const User = models.useraccount;
const Role = models.role;
const UserRole = models.userrole;

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    const decoded = jwt.verify(token, SECRET);
    console.log('Decoded JWT:', decoded);

    const user = await User.findByPk(decoded.userid);
    if (!user) {
      console.log('User not found for ID:', decoded.userid);
      return res.status(404).json({ error: 'User not found' });
    }

    const roles = await UserRole.findAll({
      where: { userid: user.userid },
      include: [{
        model: Role,
        as: 'role'
      }]
    });

    req.user = {
      id: user.userid,
      username: user.username,
      roles: roles.map(r => r.role.rolename)
    };

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
