const express = require('express');
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')
const itemRouter = require('./itemRouter')
const likeRouter = require('./likeRouter')

const router = express.Router();

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/items', itemRouter);
router.use('/likes', likeRouter);

module.exports = router;