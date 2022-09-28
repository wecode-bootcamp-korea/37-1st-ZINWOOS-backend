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

module.exports = {
    getItemMain,
    getItems,
    getAllItems
}
