const { cartDao } = require('../models')
const { orderDao } = require('../models');
const dataSource = require('../models/data-source');

const addOrder = async (userId, items) => {
    const queryRunner = dataSource.createQueryRunner()

    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
        let cartId = items.map(el => el.cartId);
        let itemId = items.map(el => el.itemId);
        let quantity = items.map(el => el.quantity);

        const check = await cartDao.checkCartById(userId, cartId)

        if (check === '0') {
            const error = new Error('INVALID_CARTS')
            error.statusCode = 404;
            throw error;
        }

        

        for (let i in items) {
            
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
    addOrder ,
    getOrder
}