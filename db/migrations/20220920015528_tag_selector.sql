-- migrate:up
CREATE TABLE tag_selector(
    id INT NOT NULL AUTO_INCREMENT,
    tag_id INT NOT NULL,
    item_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (tag_id) REFERENCES tags (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);

-- migrate:down
DROP TABLE tag_selector;