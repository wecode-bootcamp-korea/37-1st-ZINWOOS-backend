const { cartService } = require('../services');
const { asyncWrap } = require('../utils/error');

const addCart = asyncWrap(async (req, res) => {
    const userId = req.user.id
    const { itemId, optionId, quantity } = req.body;

    if (!itemId || !quantity) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400; 
        throw error;
    }   

    if (quantity <= 0) {
        const error =  new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await cartService.addCart(userId, itemId, quantity, optionId)

    res.status(201).json({ message:'Item added successfully' })
})

const getCart = asyncWrap(async(req, res) => {
    const userId = req.user.id;
    const { limit, offset } = req.query;

    if (!limit || !offset ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (+limit > 50) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    const cartList = await cartService.getCartList(+userId, +limit, +offset);

    res.status(200).json({ cartList });
})

const plusQuantity = asyncWrap(async (req, res) => {
    const { cartId } = req.body;

    if (!cartId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await cartService.plusQuantity(cartId);

    res.status(204).send()
})

const minusQuantity = asyncWrap(async (req, res) => {
    const { cartId } = req.body;

    if (!cartId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await cartService.minusQuantity(cartId)
})

const deleteCart = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { cartId } = req.query;

    if (!cartId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }
    
    await cartService.deleteCart(+userId, cartId)

    res.status(200).json({ message:'DELETE_SUCCESS'})
})

module.exports = {
    addCart,
    getCart,
    plusQuantity,
    minusQuantity,
    deleteCart
}