const { request } = require("http");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 15);
    console.log('Hash: ', hash);
    res.send({ status: 'OK', message: 'user created' });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const deleteUser = (req,res) => {};

const getUsers = (req,res) => {};

const updateUser = (req,res) => {};

module.exports = {
  createUser, deleteUser, getUsers, updateUser,
};
