const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, name: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.password.length < 3) {
    throw Error('password is too short!');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = usersRouter;
