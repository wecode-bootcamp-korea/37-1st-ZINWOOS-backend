const { cartDao } = require('../models');
const { itemDao } = require('../models');
const { orderDao } = require('../models');
const { dataSource } = require('../models/data-source');

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
        
        await cartDao.deleteCart(userId, cartId);

        for (let i in items) {
            const check = await itemDao.checkItemAmount(itemId[i])

            if (check < quantity[i]) {
                const error = new Error('INVALID_QUANTITY');
                error.statusCode = 400;
                throw error;
            }

            await orderDao.updateItemAmount(itemId[i], quantity[i]);
        }

        await orderDao.addOrderList(userId, items);

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
}

const getOrder = async (userId) => {
    const getOrderList = await orderDao.getOrderList(userId);

    return getOrderList;
}

module.exports = {
    addOrder,
    getOrder
}