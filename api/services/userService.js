const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userDao } = require('../models');
const validator = require('../utils/validator')

const hashPassword = async (password) => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    return await bcrypt.hash(password, salt)
}

const getUserById = async (id) => {
    const result = await userDao.getUserById(id)

    return result;
}

const signUp = async (name, email, password, address, phoneNumber) => {
    validator.validateEmail(email);
    validator.validatePassword(password);

    const checkOverlap = await userDao.getUserByEmail(email)

    if (checkOverlap) {
        const error = new Error('INVALID_USER')
        error.statusCode = 401;
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    return await userDao.createUser(name, email, hashedPassword, address, phoneNumber)
}

const signIn = async (email, password) => {
    validator.validateEmail(email);
    validator.validatePassword(password);

    const user = await userDao.getUserByEmail(email);

    if (!user) {
        const error = new Error('INVALID_USER');
        error.statusCode = 401;
        throw error;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        const error = new Error('INVALID_USER');
        error.statusCode = 401;
        throw error;
    }

    const accessToken = jwt.sign({ id : user.id }, process.env.JWT_SECRET,
        {
            algorithm: process.env.ALGORITHM,
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return accessToken;
}


module.exports = {
    signUp,
    signIn,
    getUserById
}