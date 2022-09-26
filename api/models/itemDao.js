const { dataSource } = require('./data-source');

// for a test
const readItems = async () => {
  return await dataSource.query(
    `SELECT
      id,
      name,
      description,
      price
    FROM items
    `
  )
};

const readItem = async (itemId) => {
  let result = [];
  const itemInfo = await dataSource.query(
    `
    SELECT
      main_categories.name as main_category_name,
      sub_categories.name as sub_category_name,
      items.name,
      items.description,
      items.price as price,
      items.detail,
      items.detail_image,
      options.name as option_name,
      options.price as option_price
    FROM items
    INNER JOIN sub_categories ON items.sub_category_id = sub_categories.id
    INNER JOIN main_categories ON sub_categories.main_category_id = main_categories.id
    INNER JOIN options_items ON items.id = options_items.item_id
    INNER JOIN options ON options_items.option_id = options.id
    WHERE items.id = ${itemId};
    `
  )
  const itemImages = await dataSource.query(
    `
    SELECT
      item_images.image_URL as image_url
    FROM
      item_images
    INNER JOIN items ON item_images.item_id = items.id
    WHERE items.id = ${itemId};
    `
  )
  
  for (let i = 0; i < itemImages.length; i++) {
    result.push(itemImages[i]['image_url']);
  }
  itemInfo[0]['image_url'] = result;

  return itemInfo;
}

module.exports = {
  readItems,
  readItem
}