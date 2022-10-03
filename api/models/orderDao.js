const { dataSource } = require('./data-source');

const addOrderList = async (userId, tmp, cartId, itemId, quantity) => {

    const queryRunner = dataSource.createQueryRunner()

    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {

        await queryRunner.query(
            `INSERT INTO orders(
                user_id,
                item_id,
                quantity
            ) VALUES ${tmp}
            `
        )
    
        for (let i in itemId) {
            await queryRunner.query(
                `UPDATE items
                SET stock = stock - ?
                WHERE id = ?
                `, [quantity[i], itemId[i]]
            )
        }

        await queryRunner.query(
            `DELETE FROM carts
            WHERE user_id = ?
            AND id IN (?)
            `, [userId, cartId]
        )

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        const error = new Error(`ROLLBACK : ${err.message}`);
        error.statusCode = 400;
        throw error;
    } finally {
        await queryRunner.release();
    }
}

const getOrderList = async (userId) => {
    const result = await dataSource.query(
        `SELECT
            o.id as orderId,
            u.name as user_name,
            u.address,
            i.detail_image as image,
            i.name as item_name,
            i.price,
            o.quantity,
            o.created_at
        FROM orders as o
        INNER JOIN users as u ON u.id = o.user_id
        INNER JOIN items as i ON i.id = o.item_id
        WHERE o.user_id = ?
        `, [userId]
    )

    return result;
}

module.exports = {
    addOrderList,
    getOrderList
}