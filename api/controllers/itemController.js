const { itemService } = require('../services')
const { asyncWrap } = require('../utils/error')

const getItemById = asyncWrap(async (req, res) => {
    const itemId = req.params.itemId;

    if (!itemId) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }
    
    const item = await itemService.getItemById(itemId);
    return res.status(200).json({ data : item });
  
});

module.exports = {
  getItemById
}