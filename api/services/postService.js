const { postDao } = require('../models');

const getAllPosts = async () => {
    
    return await postDao.getAllPosts();
}

module.exports = {
    getAllPosts
}
