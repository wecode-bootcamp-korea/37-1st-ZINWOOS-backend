const { cartService } = require('../services');
const { asyncWrap } = require('../utils/error');

const addCart = asyncWrap(async (req, res) => {
    const userId = req.user.id
    const { itemId } = req.params;
    const { optionId, quantity } = req.body;

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

    const addCart = await cartService.addCart(+userId, +itemId, optionId, quantity)

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

    if (limit > 100) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    const cartList = await cartService.getCartList(+userId, +limit, +offset)

    if (!cartList[0]) {
        await cartService.resetCartList();
    }

    res.status(201).json({ cartList })
})

const deleteCart = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const { itemId, optionId } = req.query;  
    
    if ( !userId || !itemId ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }
    
    for (let i in itemId) {
        await cartService.deleteCart(+userId, +itemId[i], optionId[i])
    }

    res.status(201).json({ message:'Item deleted successfully'})
})

module.exports = {
    addCart,
    getCartList,
    deleteCart
}