
DROP TABLE IF EXISTS whishlist_user;
CREATE TABLE IF NOT EXISTS whishlist_user (
    email       TEXT        NOT NULL,
    full_name   TEXT        NOT NULL,
    
    id          UUID        NOT NULL,
    created_at  TIMESTAMP   NULL        DEFAULT NOW(),
    was_updated BOOLEAN     NOT NULL    DEFAULT FALSE,
    PRIMARY KEY (id)
);
