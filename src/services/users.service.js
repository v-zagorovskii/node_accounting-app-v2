'use strict';

let users = [];

function getAllUsers() {
  return users;
}

function getByIdUser(id) {
  return users.find((user) => user.id === id);
}

function createUser(name) {
  const user = { id: '0', name };

  users.push(user);

  return user;
}

function deleteByIdUser(id) {
  const newUsers = users.filter((user) => user.id !== id);

  users = newUsers;
}

function updateUser({ id, name }) {
  const user = getByIdUser(id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });
}

const usersService = {
  getAllUsers,
  getByIdUser,
  createUser,
  deleteByIdUser,
  updateUser,
};

module.exports = {
  usersService,
};
