-- migrate:up
CREATE TABLE item_images(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NULL,
    image_URL VARCHAR(1000) NOT NULL,
    item_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);

-- migrate:down
DROP TABLE item_images;