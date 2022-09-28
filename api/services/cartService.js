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

const getCartList = async ( userId, limit, offset ) => {
    return await cartDao.getAllCartList(userId, limit, offset);
}

const deleteCart = async (userId, cart) => {

    const match = await cartDao.checkCartById(userId, cart);

    if (!match) {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }
    
    return await cartDao.deleteCart(userId, cart);    
}

module.exports = {
    addCart,
    getCartList,
    deleteCart,
}