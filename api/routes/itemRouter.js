const express  = require('express');
const { itemController } = require('../controllers');
const router = express.Router();

router.get('/all', itemController.getAllItems);
router.get('/item', itemController.getItems);
router.get('/new', itemController.getItemMain);
module.exports = router;

router.get('/:itemId', itemController.getItemById);

module.exports = itemRouter;

