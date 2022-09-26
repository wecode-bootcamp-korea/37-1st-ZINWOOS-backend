const express = require('express');
const { itemController } = require('../controllers')

const itemRouter = express.Router();

// all is for test
itemRouter.get('/all', itemController.getAllItems);
itemRouter.get('/:itemId', itemController.getItemById);

module.exports = itemRouter;