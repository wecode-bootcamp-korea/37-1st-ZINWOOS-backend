const { itemDao } = require('../models');

const getAllItems = async ( idx, sort, order, limit, offset) => {
    return await itemDao.getAllItems( idx, sort, order, limit, offset );
}

const getItems = async ( idx,sort, order, limit, offset) => {
    return await itemDao.getItems( idx,sort, order, limit, offset);
}

const getItemMain = async () => {
    const data = await itemDao.getItemMain();
    return data;
}

const getItemById = async (itemId) => {
  const item = await itemDao.readItem(itemId);
  return item;
}

module.exports = {
  getItemById,
  getItemMain,
  getItems,
  getAllItems
}
