-- migrate:up
CREATE TABLE carts(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    count INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);

-- migrate:down
DROP TABLE carts;