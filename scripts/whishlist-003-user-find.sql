
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
    WHERE
        whishlist_user.was_updated = FALSE
    ORDER BY
        whishlist_user.created_at
    OFFSET
        offset_token ROWS
    FETCH
        FIRST limit_token ROWS ONLY;

END;
$$ LANGUAGE plpgsql;
