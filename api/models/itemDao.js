const dataSource = require('./data-source');

const getAllItems = async ( idx, sort, order, limit, offset) => {
    const result = await dataSource.query(`
    SELECT 
    items.id as items_id,
    items.name as items_name,
    items.description,
    items.price,
    items.detail,
    items.detail_image,
    items.sub_category_id,
    tags_items.id as tags_item_table_id,
    tags_items.tag_id as tags_items_table_tag_id,
    tags_items.item_id as tags_items_table_item_id,
    tags.id as tags_id,
    tags.name as tags_name,
    sub_categories.id as sub_cate_id,
    sub_categories.name as sub_cate_name,
    sub_categories.main_category_id,
    main_categories.id as main_cate_id,
    main_categories.name as main_cate_name
    FROM items
        LEFT JOIN tags_items
            ON items.id = tags_items.item_id
        LEFT JOIN tags
            ON tags_items.tag_id = tags.id
        INNER JOIN sub_categories
            ON items.sub_category_id = sub_categories.id
        INNER JOIN main_categories
            ON sub_categories.main_category_id = main_categories.id
        WHERE main_categories.id = ${idx} 
        AND sub_categories.main_category_id = ${idx}
        ORDER BY ${sort} ${order} LIMIT ? OFFSET ?
`, [ limit, offset]
); 
return result;
}

const getItems = async ( idx, sort, order, limit, offset) => {
    const result = await dataSource.query(`
    SELECT 
    items.id as items_id,
    items.name as items_name,
    items.description,
    items.price,
    items.detail,
    items.detail_image,
    items.sub_category_id,
    tags_items.id as tags_item_table_id,
    tags_items.tag_id as tags_items_table_tag_id,
    tags_items.item_id as tags_items_table_item_id,
    tags.id as tags_id,
    tags.name as tags_name,
    sub_categories.id as sub_cate_id,
    sub_categories.name as sub_cate_name,
    sub_categories.main_category_id
    FROM items
        LEFT JOIN tags_items
            ON items.id = tags_items.item_id
        LEFT JOIN tags
            ON tags_items.tag_id = tags.id
        INNER JOIN sub_categories
            ON items.sub_category_id = sub_categories.id
        WHERE items.sub_category_id = ?
        ORDER BY ${sort} ${order} LIMIT ? OFFSET ?
`, [ idx, limit, offset]
); 
return result;
}

const getItemMain = async () => {
    const result = await dataSource.query(`
    SELECT
        items.id,
        items.name,
        items.description,
        JSON_ARRAYAGG(item_images.image_URL) as image_URL
        FROM items
            INNER JOIN item_images
                ON items.id = item_images.item_id
            INNER JOIN tags_items
                ON tags_items.item_id = items.id
            WHERE tags_items.tag_id = 1
            GROUP BY items.name
    `);
    return result;
}

module.exports = {
    getItemMain,
    getItems,
    getAllItems
}