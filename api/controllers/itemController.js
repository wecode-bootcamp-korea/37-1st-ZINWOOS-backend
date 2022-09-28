const { itemService } = require('../services');
const { asyncWrap } = require('../utils/error');

const getAllItems = asyncWrap(async (req, res) => {
    const { idx, sort, order, limit, offset } = req.query

    if(limit > 100) {
        throw new Error("Too Many Datas");
    }

    const data = await itemService.getAllItems( idx, sort, order, +limit, +offset );

    return res.status(200).json({ data });
})

const getItems = asyncWrap(async (req, res) => {
    const { idx,sort, order, limit, offset} = req.query

    if(limit > 100) {
        throw new Error("Too Many Datas");
    }

    const data = await itemService.getItems( idx,sort, order, +limit, +offset );

    return res.status(200).json({ data });
})

const getItemMain = asyncWrap(async (req,res) => {
    const data = await itemService.getItemMain();

    return res.status(200).json({data});
}) 

module.exports = {
    getItems,
    getItemMain,
    getAllItems
}