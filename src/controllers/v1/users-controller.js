const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users.js');

const createUser = async (req, res) => {
  try {
    console.log('Req: ', req.body);

    const { username, email, password, data } = req.body;
    console.log('username: ', username);
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('data: ', data);

    const hash = await bcrypt.hash(password, 15);

    // await Users.create({
    //   username,
    //   email,
    //   data,
    //   password: hash,
    // });

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;

    await user.save();

    res.send({ status: 'OK', message: 'user created' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(500).send({ status: 'DUPLICATED USER', message: error.keyValue });
      return;
    }
    console.log('error message: ', error);
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const deleteUser = (req,res) => {};

const getUsers = (req,res) => {};

const updateUser = async (req,res) => {
  try {
    const { username, email, data, userId } = req.body;
    const user = await Users.findByIdAndUpdate(userId, {
      username,
      email,
      data,
    });
    res.send({ status: 'OK', message: 'user updated' });
  } catch (error) {
    res.status(500).send('message', error.message);
  }
};

module.exports = {
  createUser, deleteUser, getUsers, updateUser,
};
