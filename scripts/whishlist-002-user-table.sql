
DROP TABLE IF EXISTS whishlist_user;
CREATE TABLE IF NOT EXISTS whishlist_user (
    id          UUID        NOT NULL,
    email       TEXT        NOT NULL,
    full_name   TEXT        NOT NULL,
    
    created_at  TIMESTAMP   NULL        DEFAULT NOW(),
    updated_at  TIMESTAMP   NULL,
    deleted_at  TIMESTAMP   NULL,
    PRIMARY KEY (id)
);
