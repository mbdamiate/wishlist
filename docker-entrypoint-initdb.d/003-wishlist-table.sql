
DROP TABLE IF EXISTS app_wishlist;
CREATE TABLE IF NOT EXISTS app_wishlist (
    id          UUID        NOT NULL    DEFAULT uuid_generate_v4(),
    user_id     UUID        NOT NULL,
    product_id  UUID        NOT NULL,
    
    created_at  TIMESTAMP   NULL        DEFAULT now(),
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE
);
