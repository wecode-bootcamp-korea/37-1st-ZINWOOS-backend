const { itemDao } = require('../models');

// for a test
const getAllItems = async () => {
   const readItems = await itemDao.readItems();
   console.log(readItems)
   return readItems;
}

const getItemById = async (itemId) => {
  const oneItem = await itemDao.readItem(itemId);
  return oneItem;
}

module.exports = {
  getAllItems,
  getItemById
}