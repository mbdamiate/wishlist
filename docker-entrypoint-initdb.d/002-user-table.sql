
DROP TABLE IF EXISTS app_user;
CREATE TABLE IF NOT EXISTS app_user (
    id          UUID        NOT NULL    DEFAULT uuid_generate_v4(),
    email       TEXT        NOT NULL,
    full_name   TEXT        NOT NULL,
    
    created_at  TIMESTAMP   NULL        DEFAULT now(),
    updated_at  TIMESTAMP   NULL,
    deleted_at  TIMESTAMP   NULL,
    
    PRIMARY KEY (id),
    UNIQUE (email)
);
