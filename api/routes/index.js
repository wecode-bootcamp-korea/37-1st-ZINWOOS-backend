const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter')
// const itemRouter = require('./itemRouter')
const likeRouter = require('./likeRouter')
// const cartRouter = require('./cartRouter')

router.use('/users', userRouter);
// router.use('/items', itemRouter);
router.use('/likes', likeRouter);
// router.use('/cart', cartRouter);

module.exports = router;