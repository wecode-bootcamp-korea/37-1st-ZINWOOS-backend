const express = require('express');
const { itemController } = require('../controllers')

const itemRouter = express.Router();

itemRouter.get('/:itemId', itemController.getItemById);

module.exports = itemRouter;