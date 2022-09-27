const { cartDao } = require('../models')

const addCart = async(userId, itemId, quantity, optionId) => {

    const user = await cartDao.getUserById(userId);

    if (optionId === null) {
        const check = await cartDao.checkWithNoOption(userId, itemId);

        if (!user) {
            const error = new Error('INVALID_USER');
            error.statusCode = 401;
            throw error;
        }
        
        if (check) {
            return await cartDao.updateWithNoOption(userId, itemId, quantity);
        }

        return await cartDao.createCartList(userId, itemId, quantity, optionId);
    }

    const check = await cartDao.checkWithOption(userId, itemId, optionId);

    if (!user) {
        const error = new Error('INVALID_USER');
        error.statusCode = 401;
        throw error;
    }
    
    if (check) {
        return await cartDao.updateWithOption(userId, itemId, quantity, optionId);
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
    
    if (optionId === null) {
        const match = await cartDao.checkWithNoOption(userId, itemId);

        if (!match) {
            const error = new Error('INVALID_ITEM');
            error.statusCode = 404;
            throw error;
        }
        
        return await cartDao.deleteWithNoOption(userId, itemId);
    }

    const match = await cartDao.checkWithOption(userId, itemId, optionId);

    if (!match) {
        const error = new Error('INVALID_ITEM');
        error.statusCode = 404;
        throw error;
    }
    
    return await cartDao.deleteWithOption(userId, itemId, optionId);    
}

module.exports = {
    addCart,
    getCartList,
    deleteCart,
    resetCartList
}