const { cartService } = require('../services');
const { asyncWrap } = require('../utils/error');

const addCart = asyncWrap(async (req, res) => {
    const userId = req.user.id
    const { itemId, optionId, quantity } = req.body;

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

    res.status(200).json({ cartList })
})

const deleteCart = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { cartId } = req.query;

    let cart = cartId.map(x => +x)
    console.log(cart)
    
    if ( !userId || !cart ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }
    
    await cartService.deleteCart(+userId, cart)

    res.status(200).json({ message:'DELETE_SUCCESS'})
})

module.exports = {
    addCart,
    getCartList,
    deleteCart
}