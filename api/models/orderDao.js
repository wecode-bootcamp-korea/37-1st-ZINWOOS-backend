const { dataSource } = require('./data-source');

const addOrderList = async (userId, items) => {

    let tmp = "";
    items.map(el => tmp += `(${userId}, ${el.itemId}, ${el.quantity}),`)
    tmp = tmp.slice(0,-1);

    const result = await dataSource.query(
        `INSERT INTO orders(
            user_id,
            item_id,
            quantity
        ) VALUES ${tmp}
        `
    )
    return result;
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

const updateItemAmount = async (itemId, quantity) => {
    
    try {
        for (let i in itemId) {
            const result = await dataSource.query(
                `UPDATE items
                SET max_amount = max_amount - ?
                WHERE id = ?
                `, [quantity[i], itemId[i]]
            )
        }
        return result;
    } catch(err) {
        const error = new Error(err.message);
        error.statusCode = 400;
        throw error;
    }
}

module.exports = {
    addOrderList,
    getOrderList,
    updateItemAmount
}