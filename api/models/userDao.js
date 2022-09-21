const dataSource = require('./data-source');

const selectUserByEmail = async (email) => {
    const result =  await dataSource.query(
        `SELECT * FROM users
         WHERE email = ?
        `, [ email ]
    );

    return result;
}

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
}

module.exports = {
    selectUserByEmail,
    createUser
}