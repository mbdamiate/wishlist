-- whishlist-002-user-functions.sql

DROP FUNCTION IF EXISTS whishlist_user_insert(TEXT, TEXT);
CREATE FUNCTION whishlist_user_insert(email_token TEXT, full_name_token TEXT)
RETURNS UUID AS $$
DECLARE uuid_token UUID; 
BEGIN

    uuid_token := uuid_generate_v4();

    INSERT INTO
        whishlist_user
        (id, email, full_name)
    VALUES
        (uuid_token, email_token, full_name_token);

    RETURN uuid_token;

END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS whishlist_user_find(INT, INT);
CREATE FUNCTION whishlist_user_find(limit_token INT, offset_token INT)
RETURNS TABLE (
    id         UUID,
    email      TEXT,
    full_name  TEXT
) AS $$
BEGIN

    RETURN QUERY 
    SELECT
        whishlist_user.id,
        whishlist_user.email,
        whishlist_user.full_name
    FROM
        whishlist_user
    ORDER BY
        whishlist_user.created_at
    OFFSET
        offset_token ROWS
    FETCH
        FIRST limit_token ROWS ONLY;

END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS whishlist_user_find_by_id(UUID);
CREATE FUNCTION whishlist_user_find_by_id(id_token UUID)
RETURNS TABLE (
    id         UUID,
    email      TEXT,
    full_name  TEXT
) AS $$
BEGIN

    RETURN QUERY 
    SELECT
        whishlist_user.id,
        whishlist_user.email,
        whishlist_user.full_name
    FROM
        whishlist_user
    WHERE
        whishlist_user.id = id_token
    ORDER BY
        whishlist_user.created_at
    FETCH
        FIRST 1 ROWS ONLY;

END;
$$ LANGUAGE plpgsql;
