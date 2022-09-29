const { userDao } = require('../models')
const { cartDao } = require('../models')

const addCart = async(userId, itemId, quantity, optionId) => {

    const user = await userDao.getUserById(userId);
    const check = await cartDao.checkCart(userId, itemId, optionId);

    if (!user) {
        const error = new Error('INVALID_USER');
        error.statusCode = 401;
        throw error;
    }
        
    if (check !== '0') {
        return await cartDao.updateCart(userId, itemId, quantity, optionId);
    }

    return await cartDao.createCartList(userId, itemId, quantity, optionId);
}

const getCart = async ( userId, limit, offset ) => {
    return await cartDao.getAllCart(userId, limit, offset);
}

const plusQuantity = async (cartId) => {
    const match = await cartDao.checkCartById(cartId);

    if (match === '0') {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }

    return await cartDao.plusQuantity(cartId)
}

const minusQuantity = async (cartId) => {
    const match = await cartDao.checkCartById(cartId);

    if (match === '0') {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }

    return await cartDao.minusQuantity(cartId)

const deleteCart = async (userId, cartId) => {

    const match = await cartDao.checkCartById(userId, cartId);

    if (match === '0') {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }
    
    return await cartDao.deleteCart(userId, cartId);    
}


module.exports = {
    addCart,
    getCart,
    plusQuantity,
    minusQuantity,
    deleteCart
}