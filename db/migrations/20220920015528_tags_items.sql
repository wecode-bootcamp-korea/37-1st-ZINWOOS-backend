-- migrate:up
CREATE TABLE tags_items(
    id INT NOT NULL AUTO_INCREMENT,
    tag_id INT NOT NULL,
    item_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (tag_id) REFERENCES tags (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);

-- migrate:down
DROP TABLE tags_items;