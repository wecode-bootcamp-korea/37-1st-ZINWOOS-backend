const { itemService } = require('../services');
const { asyncWrap } = require('../utils/error');

const getAll = asyncWrap(async (req, res) => {
    const { sort, order } = req.query
    let { limit, offset } = req.query

    limit = limit || 50
    offset = offset || 0

    if(limit > 100) {
        throw new Error("Too Many Datas");
    }

    const data = await itemService.getAll( sort, order, +limit, +offset );

    return res.status(200).json({ data });
})

const getMainList = asyncWrap(async (req, res) => {
    const { main_category_id, sort, order, limit, offset } = req.query

    if(limit > 100) {
        throw new Error("Too Many Datas");
    }

    const data = await itemService.getMainList( main_category_id, sort, order, +limit, +offset );

    return res.status(200).json({ data });
})

const getSubList = asyncWrap(async (req, res) => {
    const { sub_category_id, sort, order, limit, offset} = req.query

    if(limit > 100) {
        throw new Error("Too Many Datas");
    }

    const data = await itemService.getSubList( sub_category_id, sort, order, +limit, +offset );

    return res.status(200).json({ data });
})

const getNewList = asyncWrap(async (req,res) => {
    const data = await itemService.getNewList();

    return res.status(200).json({data});
}) 

module.exports = {
    getSubList,
    getNewList,
    getMainList,
    getAll
}