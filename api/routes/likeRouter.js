const express = require('express');
const { likeController } = require('../controllers')
const { loginRequired } = require('../utils/auth')

const likeRouter = express.Router();

likeRouter.get('', loginRequired, likeController.getLikes);
likeRouter.post('', loginRequired, likeController.addLikes);
likeRouter.delete('/:itemId', loginRequired, likeController.delLikes);

module.exports = likeRouter;