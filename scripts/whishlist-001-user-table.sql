-- whishlist-001-user-table.sql

DROP TABLE IF EXISTS whishlist_user;
CREATE TABLE IF NOT EXISTS whishlist_user (
    email       TEXT        NOT NULL,
    full_name   TEXT        NOT NULL,
    
    id          UUID        NOT NULL,
    created_at  TIMESTAMP   DEFAULT NOW(),
    updated_at  TIMESTAMP   NULL,
    PRIMARY KEY (id),
    UNIQUE      (email)
);
