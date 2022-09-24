const { postService } = require('../services');

const getAllPosts = async (req, res) => {

    const posts = await postService.getAllPosts();

    return res.status(200).json({ data : posts });
}

module.exports = {
    getAllPosts
}