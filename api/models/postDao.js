const dataSource = require('./data-source');

const getAllPosts = async () => {
    try {
        const result = await dataSource.query(`
        SELECT 
        items.id as items_id,
        items.name as items_name,
        items.description,
        items.price,
        items.detail,
        items.detail_image,
        item_images.id as item_images_table_id,
        item_images.name as item_images_table_name,
        item_images.image_URL as item_images_table_image_URL,
        item_images.item_id as item_images_table_item_id,
        options_items.id as options_items_id,
        options_items.item_id as options_items_item_id,
        options_items.option_id,
        options.id as options_table_id,
        options.name as options_table_name,
        options.price as options_table_price,
        tags_items.id as tags_item_table_id,
        tags_items.tag_id as tags_items_table_tag_id,
        tags_items.item_id as tags_items_table_item_id,
        tags.id as tags_id,
        tags.name as tags_name
        FROM items
            INNER JOIN item_images
                ON items.id = item_images.item_id
            INNER JOIN options_items
                ON items.id = options_items.item_id
            INNER JOIN options
                ON options_items.option_id = options.id
            INNER JOIN tags_items
                ON items.id = tags_items.item_id
            INNER JOIN tags
                ON tags_items.tag_id = tags.id
    `
    );
    console.log(result);
    if (result === []) {
        throw new Error(err);
    }
    return result;
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = {getAllPosts}