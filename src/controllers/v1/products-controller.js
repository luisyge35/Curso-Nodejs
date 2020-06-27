const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;
    console.log(req.body);
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });
    res.send({ status: 'OK', data: product });
  } catch (error) {
    res.status(500).send('error: ', error.message);
  }
};

const deleteProduct = (req,res) => {};

const getProducts = async (req,res) => {
  try {
    const products = await Products.find().populate('user', 'username email data role');
    res.send({ status: 'OK', products });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
};
