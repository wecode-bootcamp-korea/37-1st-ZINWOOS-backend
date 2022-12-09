const {dataSource} = require('./data-source');

const getAll = async ( sort, order, limit, offset) => {
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
    main_categories.name as main_cate_name,
    main_categories.description as main_description,
    likes.item_id as likes
    FROM items
        LEFT JOIN tags_items
            ON items.id = tags_items.item_id
        LEFT JOIN tags
            ON tags_items.tag_id = tags.id
        INNER JOIN sub_categories
            ON items.sub_category_id = sub_categories.id
        INNER JOIN main_categories
            ON sub_categories.main_category_id = main_categories.id
        LEFT JOIN likes
            ON items.id = likes.item_id
        ORDER BY ${sort} ${order} LIMIT ? OFFSET ?
`, [ limit, offset]
); 
return result;
}

const getMainList = async ( main_category_id, sort, order, limit, offset) => {
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
    main_categories.name as main_cate_name,
    main_categories.description as main_description,
    likes.item_id as likes
    FROM items
        LEFT JOIN tags_items
            ON items.id = tags_items.item_id
        LEFT JOIN tags
            ON tags_items.tag_id = tags.id
        INNER JOIN sub_categories
            ON items.sub_category_id = sub_categories.id
        INNER JOIN main_categories
            ON sub_categories.main_category_id = main_categories.id
        LEFT JOIN likes
            ON items.id = likes.item_id
        INNER JOIN main_categories
            ON sub_categories.main_category_id = main_categories.id
        WHERE main_categories.id = ${main_category_id} 
        AND sub_categories.main_category_id = ${main_category_id}
        ORDER BY ${sort} ${order} LIMIT ? OFFSET ?
`, [ limit, offset]
); 
return result;
}

const getSubList = async ( sub_category_id, sort, order, limit, offset) => {
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
    main_categories.name as main_cate_name,
    main_categories.description as main_description,
    likes.item_id as likes
    FROM items
        LEFT JOIN tags_items
            ON items.id = tags_items.item_id
        LEFT JOIN tags
            ON tags_items.tag_id = tags.id
        INNER JOIN sub_categories
            ON items.sub_category_id = sub_categories.id
        LEFT JOIN likes
            ON items.id = likes.item_id
        INNER JOIN main_categories
            ON sub_categories.main_category_id = main_categories.id
        WHERE items.sub_category_id = ?
        ORDER BY ${sort} ${order} LIMIT ? OFFSET ?
`, [ sub_category_id, limit, offset]
); 
return result;
}

const getNewList = async () => {
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

const readItem = async (itemId) => {
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
        items.max_amount,
        ANY_VALUE(options.name) as option_name,
        ANY_VALUE(options.price) as option_price,
        JSON_ARRAYAGG(item_images.image_URL) as image_url
            FROM items
            JOIN sub_categories ON items.sub_category_id = sub_categories.id
            JOIN main_categories ON sub_categories.main_category_id = main_categories.id
            JOIN options_items ON items.id = options_items.item_id
            JOIN options ON options_items.option_id = options.id
            JOIN item_images ON items.id = item_images.item_id
            WHERE items.id = ${itemId};
    `
)
    return itemInfo;
}

module.exports = {
    readItem,
    getNewList,
    getSubList,
    getMainList,
    getAll
}