-- migrate:up
CREATE TABLE main_categories(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE main_categories;