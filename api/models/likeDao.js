const { dataSource } = require('./data-source');

const getLikes = async (userId) => {
  return await dataSource.query(
    `SELECT
      likes.id as like_id,
      likes.item_id,
      items.name,
      items.detail_image,
      items.price
    FROM likes
    INNER JOIN items ON items.id = likes.item_id
    WHERE user_id = ${userId};
    `
  );
};


const addLikes = async (itemId, userId) => {
  return await dataSource.query(
    `INSERT INTO likes(
      item_id,
      user_id
    ) VALUES (?, ?);
    `,
    [itemId, userId]
  );
};


const delLikes = async (itemId, userId) => {
  const deletedLike = (await dataSource.query(
    `DELETE FROM likes
    WHERE item_id = ? AND user_id = ?;
    `,
    [itemId, userId]
  )).affectedRows;
    
  if (deletedLike !== 0 && deletedLike !== 1) throw new Error('UNEXPECTED_NUMBER_OF_RECORDS_DELETED')

  return deletedLike;
};

module.exports = {
  getLikes,
  addLikes,
  delLikes
};