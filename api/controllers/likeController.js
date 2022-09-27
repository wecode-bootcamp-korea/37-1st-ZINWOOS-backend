const { likeService } = require('../services')
const { asyncWrap } = require('../utils/error')

const getLikes = asyncWrap(async(req, res) => {
  const userId = req.user;

  if (!userId) {
    return res.status(400).json({ message : 'KEY_ERROR' });
  }

  const likes = await likeService.getLikes(userId);
  return res.status(200).json({ data : likes });
});


const addLikes = asyncWrap(async(req, res) => {
  const { itemId } = req.body;
  const userId = req.user;
  
  if (!itemId || !userId) {
    return res.status(400).json({ message : 'KEY_ERROR' });
  }

  await likeService.addLikes(itemId, userId);
  res.status(201).json({ message : 'USER_LIKES_THIS_ITEM' });
});


const delLikes = asyncWrap(async(req, res) => {
  const itemId = req.params;
  const userId = req.user;
  console.log(itemId)
  console.log(userId)
  
  if (!itemId || !userId) {
    return res.status(400).json({ message : 'KEY_ERROR' });
  }

  await likeService.delLikes(itemId, userId);
  res.status(204).json({ message : 'ITEM_DISLIKED' });
});

module.exports = {
  getLikes,
  addLikes,
  delLikes
};