-- migrate:up
CREATE TABLE options_items(
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    option_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (item_id) REFERENCES items (id),
    FOREIGN KEY (option_id) REFERENCES options (id)
);

-- migrate:down
DROP TABLE options_items;