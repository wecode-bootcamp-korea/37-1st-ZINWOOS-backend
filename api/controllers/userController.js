const { userService } = require('../services')

const signUp = async (req, res) => {
    const { name, email, password, address, phoneNumber } = req.body;

    if ( !name || !email || !password || !address || !phoneNumber ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const signUp = await userService.signUp(name, email, password, address, phoneNumber);

    res.status(201).json({ message:'User created successfully!' })
}

module.exports = {
    signUp
}