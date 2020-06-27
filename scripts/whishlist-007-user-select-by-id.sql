
DROP FUNCTION IF EXISTS whishlist_user_select_by_id(UUID);
CREATE FUNCTION whishlist_user_select_by_id(id_token UUID)
RETURNS TABLE (
    id         UUID,
    email      TEXT,
    full_name  TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
) AS $$
BEGIN

    RETURN QUERY 
    SELECT
        whishlist_user.id,
        whishlist_user.email,
        whishlist_user.full_name,
        whishlist_user.created_at,
        whishlist_user.updated_at,
        whishlist_user.deleted_at
    FROM
        whishlist_user
    WHERE
        whishlist_user.updated_at IS NULL
        AND
        whishlist_user.deleted_at IS NULL
        AND
        whishlist_user.id = id_token
    ORDER BY
        whishlist_user.created_at DESC
    FETCH
        FIRST 1 ROWS ONLY;

END;
$$ LANGUAGE plpgsql;
