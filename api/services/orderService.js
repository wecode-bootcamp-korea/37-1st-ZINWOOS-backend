const { cartDao } = require('../models')
const { orderDao } = require('../models');
const dataSource = require('../models/data-source');

const pullOrder = async (userId, cartId, itemId, quantity) => {
    const queryRunner = dataSource.createQueryRunner()

    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
        
        if (await cartDao.checkCartById(userId, cartId) === '0') {
            const error = new Error('INVALID_REQUEST');
            error.statusCode = 404;
            throw error;
        }
                
        await orderDao.addOrderList(userId, itemId, quantity)
        await cartDao.deleteCart(userId, cartId)
        
        for (let i in itemId) {
            await orderDao.updateItemAmount(itemId[i], quantity[i])
        }

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        const error = new Error(`ROLLBACK : ${err.message}`);
        error.statusCode = err.statusCod;
        throw error;
    } finally {
        await queryRunner.release();
    }
}

const getOrder = async (userId) => {
    const getOrderList = await orderDao.getOrderList(userId);

    return getOrderList;
}

module.exports = {
    pullOrder,
    getOrder
}