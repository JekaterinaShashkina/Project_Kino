const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/database"); 
const initModels = require("../models/init-models");
const models = initModels(db); 

require("dotenv").config();

const SECRET = process.env.JWT_SECRET;
const User = models.useraccount;
const Role = models.role;
const UserRole = models.userrole;

exports.register = async (req, res) => {
  try {
    const { username, password, useremail } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ error: 'User is exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      useremail,
      createdat: new Date()
    });

    const role = await Role.findOne({ where: { rolename: 'User' } });
    if (!role) return res.status(500).json({ error: 'Role is not found' });

    await UserRole.create({ userid: newUser.userid, roleid: role.roleid });

    res.status(201).json({
      message: 'User registered',
      user: {
        id: newUser.userid,
        username: newUser.username,
        email: newUser.useremail
      }
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'Error' });
  }
};

  
  exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(404).json({ error: 'user is not found' });
  
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: 'password is incorrect' });
  
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'success', token });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'error' });
    }
  };
  

  exports.logout = (req, res) => {
    res.json({ message: 'logout' });
  };


  exports.addRoleToUser = async (req, res) => {
    try {
      const { userid, roleid } = req.body;
  
      const user = await User.findByPk(userid);
      if (!user) return res.status(404).json({ error: 'user is not found' });
  
      const role = await Role.findByPk(roleid);
      if (!role) return res.status(404).json({ error: 'Role is not found' });
  
      const exists = await UserRole.findOne({ where: { userid, roleid } });
      if (exists) return res.status(400).json({ error: 'User has such role' });
  
      await UserRole.create({ userid, roleid });
  
      res.json({ message: 'Role is added' });
    } catch (err) {
      console.error('Error', err);
      res.status(500).json({ error: 'Err' });
    }
  };
  

  exports.removeRoleFromUser = async (req, res) => {
    try {
      const { userid, roleid } = req.body;
  
      const deleted = await UserRole.destroy({ where: { userid, roleid } });
      if (deleted === 0) return res.status(404).json({ error: 'Role is  not found' });
  
      res.json({ message: 'role is removed' });
    } catch (err) {
      console.error('err:', err);
      res.status(500).json({ error: 'err' });
    }
  };