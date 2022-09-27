const { cartService } = require('../services');
const { asyncWrap } = require('../utils/error');

const addCart = asyncWrap(async (req, res) => {
    const userId = req.user.id
    const { itemId, optionId, quantity } = req.body;
    console.log(itemId)
    console.log(optionId)
    console.log(typeof optionId)
    console.log(quantity)

    if ( !userId || !itemId || !quantity ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400; 
        throw error;
    }   

    if (quantity <= 0) {
        const error =  new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const addCart = await cartService.addCart(userId, itemId, quantity, optionId)

    res.status(201).json({ message:'Item added successfully' })
})

const getCartList = asyncWrap(async(req, res) => {
    const userId = req.user.id;
    const { limit, offset } = req.query;

    if (!userId || !limit || !offset ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (+limit > 50) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    const cartList = await cartService.getCartList(+userId, +limit, +offset)

    res.status(201).json({ cartList })
})

const deleteCart = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.query;
    const { optionId } = req.body;

    if ( !userId || !itemId ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }
    
    for (let i in itemId) {
        await cartService.deleteCart(+userId, +itemId[i], optionId[i])
    }

    res.status(200).json({ message:'DELETE_SUCCESS'})
})

module.exports = {
    addCart,
    getCartList,
    deleteCart
}