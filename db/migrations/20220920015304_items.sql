-- migrate:up
CREATE TABLE items(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(1000) NULL,
    price DECIMAL(8,1) NOT NULL,
    sub_category_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id)
);

-- migrate:down
DROP TABLE items;