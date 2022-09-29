const express = require('express');
const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const cartRouter = express.Router()

cartRouter.get('', loginRequired, cartController.getCart);
cartRouter.post('', loginRequired, cartController.addCart);
cartRouter.patch('/plus', loginRequired, cartController.plusQuantity);
cartRouter.patch('/minus', loginRequired, cartController.minusQuantity);
cartRouter.delete('', loginRequired, cartController.deleteCart);

module.exports = cartRouter;