-- migrate:up
CREATE TABLE details(
    id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(3000) NULL,
    image_URL VARCHAR(1000) NULL,
    item_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);

-- migrate:down
DROP TABLE details