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

const createCartList = async (userId, itemId, quantity, optionId) => {
    const result = await dataSource.query(
        `INSERT INTO carts(
            user_id,
            item_id,
            quantity,
            option_id
        ) VALUES (?, ?, ?, ?)
        `, [userId, itemId, quantity, optionId]
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

const checkWithOption = async (userId, itemId, optionId) => {
    const [result] = await dataSource.query(
        `SELECT *
        FROM carts
        WHERE EXISTS (
            SELECT *
            FROM carts
            WHERE user_id = ?
            AND item_id = ?
            AND option_id = ?
        )
        `, [userId, itemId, optionId]
    )

    return result;
}

const checkWithNoOption = async (userId, itemId) => {
    const [result] = await dataSource.query(
        `SELECT *
        FROM carts
        WHERE EXISTS (
            SELECT *
            FROM carts
            WHERE user_id = ?
            AND item_id = ?
            AND option_id IS NULL
        )
        `, [userId, itemId]
    )

    return result;
}

const updateWithOption= async (userId, itemId, quantity, optionId) => {
    const result = await dataSource.query(
        `UPDATE carts
        SET quantity = carts.quantity + ?
        WHERE user_id = ?
        AND item_id = ?
        AND option_id = ?
        `, [quantity, userId, itemId, optionId]
    )

    return result;
}

const updateWithNoOption= async (userId, itemId, quantity) => {
    const result = await dataSource.query(
        `UPDATE carts
        SET quantity = carts.quantity + ?
        WHERE user_id = ?
        AND item_id = ?
        AND option_id IS NULL
        `, [quantity, userId, itemId]
    )

    return result;
}

const deleteWithOption= async (userId, itemId, optionId) => {
    const result = await dataSource.query(
        `DELETE FROM carts
        WHERE user_id = ?
        AND item_id = ?
        AND option_id = ?
        `, [userId, itemId, optionId]
    )

    return result;
}

const deleteWithNoOption= async (userId, itemId) => {
    const result = await dataSource.query(
        `DELETE FROM carts
        WHERE user_id = ?
        AND item_id = ?
        AND option_id IS NULL
        `, [userId, itemId]
    )

    return result;
}

module.exports = {
    getUserById,
    createCartList,
    getAllCartList,
    checkWithOption,
    checkWithNoOption,
    updateWithOption,
    updateWithNoOption,
    deleteWithOption,
    deleteWithNoOption
}