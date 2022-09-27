const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')
// const cartRouter = require('./cartRouter')
const likeRouter = require('./likeRouter')

router.use('/users', userRouter);
router.use('/items', itemRouter);
// router.use('/cart', cartRouter);
router.use('/likes', likeRouter);

module.exports = router;