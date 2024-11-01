'use strict';

const { Router } = require('express');
const { usersService } = require('./../services/users.service');

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await usersService.getAllUsers();

  res.send(users);
});

usersRouter.get('/:id', async (req, res) => {
  const user = await usersService.getByIdUser(req.params.id);

  if (!user) {
    return res.status(404).send({ message: 'Not found' });
  }

  res.status(200).send(user);
});

usersRouter.post('/', async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).send({ message: 'Name is required' });
  }

  const user = await usersService.createUser(name);

  res.status(201).send(user);
});

usersRouter.patch('/:id', (req, res) => {
  const { name } = req.body;

  const user = usersService.getByIdUser(req.params.id);

  if (!user) {
    return res.status(404).send({ message: 'Not found' });
  }

  if (!name) {
    return res.status(400).send({ message: 'Name is required' });
  }

  const updatedUser = usersService.updateUser({
    id: req.params.id,
    name,
  });

  res.status(200).send(updatedUser);
});

usersRouter.delete('/:id', async (req, res) => {
  const user = await usersService.getByIdUser(req.params.id);

  if (!user) {
    return res.status(404).send({ message: 'Not Found' });
  }

  await usersService.deleteByIdUser(user.id);

  res.status(204);
});

module.exports = {
  usersRouter,
};
