import express from 'express';
const productsController = require('../../controllers/v1/products-controller');

const router = express.Router();

router.post('/create', productsController.createProduct);
router.post('/delete', productsController.deleteProduct);
router.get('/get-all', productsController.getProducts);
router.get('/get-byUser/:userId', productsController.getProductsbyUser);

module.exports = router;
