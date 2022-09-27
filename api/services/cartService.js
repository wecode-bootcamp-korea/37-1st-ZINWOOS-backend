const { cartDao } = require('../models')

const addCart = async(userId, itemId, quantity, optionId) => {

    const user = await cartDao.getUserById(userId);
    const check = await cartDao.checkOverlap(userId, itemId, optionId);

    if (!user) {
        const error = new Error('INVALID_USER');
        error.statusCode = 401;
        throw error;
    }
    
    if (check) {
        return await cartDao.updateCart(userId, itemId, quantity, optionId);
    }

    return await cartDao.createCartList(userId, itemId, quantity, optionId);
}

const getCartList = async ( userId, limit, offset ) => {
    return await cartDao.getAllCartList(userId, limit, offset);
}

const resetCartList = async () => {
    return await cartDao.resetCartListId();
}

const deleteCart = async (userId, itemId, optionId) => {
    
    const match = await cartDao.checkOverlap(userId, itemId, optionId);

    if (!match) {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }
    
    return await cartDao.deleteCartList(userId, itemId, optionId);    
}

module.exports = {
    addCart,
    getCartList,
    deleteCart,
    resetCartList
}