const dataSource = require('./data-source');

const getUserByEmail = async (email) => {
    const [ result ] =  await dataSource.query(
        `SELECT(
            id,
            name,
            email,
            password,
            address,
            phone_number
        ) 
        FROM users
        WHERE email = ?
        `, [ email ]
    );

    return result;
};

const getUserById = async(id) => {
    const [ result ] = await dataSource.query(
        `SELECT(
            id,
            name,
            email,
            password,
            address,
            phone_number
        )
        FROM users
        WHERE id = ?
        `, [ id ]
    );

    return result;
};

const createUser = async (name, email, hashedPassword, address, phoneNumber) => {
    const result = await dataSource.query(
        `INSERT INTO users(
            name,
            email,
            password,
            address,
            phone_number
        ) VALUES (?, ?, ?, ?, ?)
        `, [ name, email, hashedPassword, address, phoneNumber]
    );

    return result;
};

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
}