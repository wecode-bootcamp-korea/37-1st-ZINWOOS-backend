const { likeDao } = require('../models');

const getLikes = async (userId) => {
  return await likeDao.getLikes(userId);
}


const addLikes = async (itemId, userId) => {
  return await likeDao.addLikes(itemId, userId);
}


const deleteLikes = async (itemId, userId) => {
  return await likeDao.deleteLikes(itemId, userId);
}


module.exports = {
  getLikes,
  addLikes,
  deleteLikes
}