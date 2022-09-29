const express  = require('express');
const { itemController } = require('../controllers');
const itemRouter = express.Router();

itemRouter.get('/main', itemController.getMainList);
itemRouter.get('/sub', itemController.getSubList);
itemRouter.get('/new', itemController.getNewList);
itemRouter.get('/all', itemController.getAll);

module.exports = itemRouter;