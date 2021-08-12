const path = require('path');
const db = require('../dataBase/db');
const { passwordHasher } = require('../services');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await db.select().from('users');

      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  getUserById: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { body: { password } } = req;

      const hashedPassword = await passwordHasher.hash(password);

      await db('users').insert({ ...req.body, password: hashedPassword });

      res.json('User created');
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await db('users').where({ id: userId }).update(req.body);

      res.sendFile(path.join(process.cwd(), 'index.html'));
    } catch (e) {
      next(e);
    }
  },
};
