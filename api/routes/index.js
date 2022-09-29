const express = require('express');
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')
const itemRouter = require('./itemRouter')

const router = express.Router();

const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');

router.use('/users', userRouter);
router.use('/posts', itemRouter);
router.use('/carts', cartRouter);

module.exports = router;