const express  = require('express');
const { itemController } = require('../controllers');
const itemRouter = express.Router();

itemRouter.get('/main', itemController.getAllItems);
itemRouter.get('/sub', itemController.getItems);
itemRouter.get('/new', itemController.getItemMain);
itemRouter.get('/all', itemController.getAll);

module.exports = itemRouter;