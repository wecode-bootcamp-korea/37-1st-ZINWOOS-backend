const { itemDao } = require('../models');

const getAll = async ( sort, order, limit, offset) => {
    return await itemDao.getAll( sort, order, limit, offset );
}

const getMainList = async ( main_category_id, sort, order, limit, offset) => {
    return await itemDao.getMainList( main_category_id, sort, order, limit, offset );
}

const getSubList = async ( sub_category_id, sort, order, limit, offset) => {
    return await itemDao.getSubList( sub_category_id,sort, order, limit, offset);
}

const getNewList = async () => {
    const data = await itemDao.getNewList();
    return data;
}

const getItemById = async (itemId) => {
  const item = await itemDao.readItem(itemId);
  return item;
}

module.exports = {
  getItemById,
  getNewList,
  getSubList,
  getMainList,
  getAll
}