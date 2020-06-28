const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../mongo/models/users.js');

const expiretime = 60 * 10;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    // eslint-disable-next-line no-empty
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ userid: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: expiretime });
        res.send({
          status: 'OK',
          data: {
            token,
            expiresIn_s: expiretime,
          },
        });
      } else {
        res.status(403).send({ status: 'ERROR', message: 'Wrong password' });
      }
    } else {
      res.status(401).send({ status: 'ERROR', message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    console.log('Req: ', req.body);

    const { username, email, password, data } = req.body;
    console.log('username: ', username);
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('data: ', data);

    const hash = await bcrypt.hash(password, 15);

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
    res.send({ status: 'OK', message: user });
  } catch (error) {
    res.status(500).send('message', error.message);
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  login,
};
