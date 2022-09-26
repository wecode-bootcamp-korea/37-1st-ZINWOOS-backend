const express = require('express');
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')

const router = express.Router();

router.use('/users', userRouter);
router.user('/carts', cartRouter);

module.exports = router;