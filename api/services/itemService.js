const { itemDao } = require('../models');

const getItemById = async (itemId) => {
  const item = await itemDao.readItem(itemId);
  return item;
}

module.exports = {
  getItemById
}