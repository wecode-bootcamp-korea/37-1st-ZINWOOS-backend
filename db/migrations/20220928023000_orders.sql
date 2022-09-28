-- migrate:up
CREATE TABLE orders(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    cart_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (cart_id) REFERENCES carts (id)
)

-- migrate:down
DROP TABLE orders
