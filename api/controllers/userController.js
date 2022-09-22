const { userService } = require('../services')
const { asyncWrap } = require('../utils/error')

const signUp = asyncWrap(async (req, res) => {
    const { name, email, password, address, phoneNumber } = req.body;

    if ( !name || !email || !password || !address || !phoneNumber ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await userService.signUp(name, email, password, address, phoneNumber);

    res.status(201).json({ message:'User created successfully!' })
})

module.exports = {
    signUp
}