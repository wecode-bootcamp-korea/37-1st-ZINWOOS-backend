const { itemService } = require('../services')
const { asyncWrap } = require('../utils/error')

// for a test
const getAllItems = async (req, res) => {
  const items = await itemService.getAllItems();
  return res.status(200).json({ data : items });
};

const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    if (!itemId) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }
    const itemById = await itemService.getItemById(itemId);
    return res.status(201).json({ data : itemById });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
}

module.exports = {
  getAllItems,
  getItemById
}