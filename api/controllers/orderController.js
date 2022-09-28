const { asyncWrap } = require('../utils/error');
const { orderService } = require('../services');

const pullOrder = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { cartId, itemId, quantity } = req.body;
    console.log(cartId)
    console.log(itemId)
    console.log(quantity)
    
    if ( !userId || !cartId || !quantity ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await orderService.pullOrder(userId, cartId, itemId, quantity);

    res.status(200).json({ message:'Your order has been received' })
})

const getOrder = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    console.log(userId)

    if (!userId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const getOrder = await orderService.getOrder(userId)

    res.status(201).json({ getOrder });
})

module.exports = {
    pullOrder,
    getOrder
}