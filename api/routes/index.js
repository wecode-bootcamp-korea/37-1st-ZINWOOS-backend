const express = require('express');
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')
const itemRouter = require('./itemRouter')

const router = express.Router();

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/items', itemRouter);

module.exports = router;