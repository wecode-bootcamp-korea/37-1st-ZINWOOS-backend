const express  = require('express');
const { itemController } = require('../controllers');
const router = express.Router();

router.get('/main', itemController.getMainList);
router.get('/sub', itemController.getSubList);
router.get('/new', itemController.getNewList);
router.get('/all', itemController.getAll);

router.get('/:itemId', itemController.getItemById);

module.exports = router;