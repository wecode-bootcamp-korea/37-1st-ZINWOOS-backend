const { likeDao } = require('../models');

const getLikes = async (userId) => {
  return await likeDao.getLikes(userId);
}


const addLikes = async (itemId, userId) => {
  return await likeDao.addLikes(itemId, userId);
}


const delLikes = async (itemId, userId) => {
  return await likeDao.delLikes(itemId, userId);
}


module.exports = {
  getLikes,
  addLikes,
  delLikes
}