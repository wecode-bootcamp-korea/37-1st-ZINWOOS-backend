const bcrypt = require('bcrypt');

const { userDao } = require('../models');
const validator = require('../utils/validator')

const hashPassword = async (password) => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    return await bcrypt.hash(password, salt)
}

const signUp = async (name, email, password, address, phoneNumber) => {
    validator.validateEmail(email);
    validator.validatePassword(password);

    const checkOverlap = await userDao.getUserByEmail(email)

    if (checkOverlap) {
        const error = new Error('User already exists')
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    return await userDao.createUser(name, email, hashedPassword, address, phoneNumber)
}

module.exports = {
    signUp
}