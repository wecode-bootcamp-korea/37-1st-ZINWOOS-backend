const express = require('express');

const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const likeRouter = require('./likeRouter')

const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', itemRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/likes', likeRouter);


module.exports = router;