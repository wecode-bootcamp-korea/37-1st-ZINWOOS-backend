const express = require('express');
const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const cartRouter = express.Router()

cartRouter.get('/', loginRequired, cartController.getCartList);
cartRouter.post('/', loginRequired, cartController.addCart);
cartRouter.delete('/', loginRequired, cartController.deleteCart);

module.exports = cartRouter;