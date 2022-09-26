const dataSource = require('./data-source')

const getUserById = async (userId) => {
    const [ result ] = await dataSource.query(
        `SELECT
            id,
            name,
            email,
            password,
            address,
            phone_number
        FROM users
        WHERE id = ?
        `, [userId]
    )

    return result;
}

const createCartList = async (userId, itemId, optionId, quantity) => {
    const result = await dataSource.query(
        `INSERT INTO carts(
            user_id,
            item_id,
            option_id,
            quantity
        ) VALUES (?, ?, ?, ?)
        `, [userId, itemId, optionId, quantity]
    )

    return result;
}

const getAllCartList = async (userId, limit, offset) => {
    const result = await dataSource.query(
        `SELECT
            i.id,
            i.name,
            i.price,
            i.detail_image,
            c.quantity,
            c.checkbox,
            o.name as option_name
        FROM carts as c
        LEFT JOIN items as i ON i.id = c.item_id
        LEFT JOIN options as o ON o.id = c.option_id
        WHERE c.user_id = ?
        LIMIT ? OFFSET ?
        `, [userId, limit, offset]
    )

    return result;
}

const checkOverlap = async (userId, itemId, optionId) => {
    const [ result ] = await dataSource.query(
        `SELECT *
        FROM carts
        WHERE user_id = ?
        AND item_id = ?
        AND (option_id = ?
        OR option_id IS NULL)
        `, [userId, itemId, optionId]
    )

    return result;
}

const addQuantity = async (userId, itemId, quantity, optionId) => {
    const result = await dataSource.query(
        `UPDATE carts
        SET quantity = carts.quantity + ?
        WHERE user_id = ?
        AND item_id = ?
        AND (option_id = ?
        OR option_id IS NULL)
        `, [quantity, userId, itemId, optionId]
    )

    return result;
}

const resetCartListId = async () => {
    const result = await dataSource.query(
        `ALTER TABLE carts AUTO_INCREMENT = 1
        `
    )

    return result;
}

const deleteCartList= async (userId, itemId, optionId) => {
    const result = await dataSource.query(
        `DELETE FROM carts
        WHERE user_id = ?
        AND item_id = ?
        AND (option_id = ?
        OR option_id IS NULL)
        `, [userId, itemId, optionId]
    )

    return result;
}

module.exports = {
    getUserById,
    createCartList,
    getAllCartList,
    checkOverlap,
    addQuantity,
    resetCartListId,
    deleteCartList
}