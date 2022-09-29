const { cartDao } = require('../models');
const { orderDao } = require('../models');
const { dataSource } = require('../models/data-source');

const addOrder = async (userId, items) => {
    const queryRunner = dataSource.createQueryRunner()
    let cartId = items.map(el => el.cartId);
    let itemId = items.map(el => el.itemId);
    let quantity = items.map(el => el.quantity);

    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {

        const checkCart = await cartDao.checkCartById(userId, cartId)

        if (checkCart === '0') {
            const error = new Error('INVALID_CARTS')
            error.statusCode = 404;
            throw error;
        }
        
        await cartDao.deleteCart(userId, cartId);
        await orderDao.updateItemAmount(itemId, quantity);
        await orderDao.addOrderList(userId, items);

        await queryRunner.commitTransaction();
    } catch (err) {
        console.log(err)
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