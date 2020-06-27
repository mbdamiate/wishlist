
DROP FUNCTION IF EXISTS whishlist_user_update(UUID, TEXT);
CREATE FUNCTION whishlist_user_update(id_token UUID, full_name_token TEXT)
RETURNS UUID AS $$
DECLARE new_id_token UUID;
BEGIN

    IF (id_token = (
        SELECT
            whishlist_user.id
        FROM whishlist_user
        WHERE
            whishlist_user.id = id_token
            AND
            whishlist_user.full_name <> full_name_token
            AND
            whishlist_user.updated_at IS NULL
            AND
            whishlist_user.deleted_at IS NULL
        ORDER BY
            whishlist_user.created_at DESC
        FETCH FIRST 1 ROWS ONLY))
        THEN

        UPDATE whishlist_user
        SET
            updated_at = NOW()
        WHERE
            id = id_token;
        
        new_id_token := uuid_generate_v4();

        INSERT INTO whishlist_user
        SELECT
            new_id_token,
            email,
            full_name_token
        FROM whishlist_user
        WHERE
            id = id_token;

        RETURN new_id_token;

    ELSE

        RETURN id_token;

    END IF;

END;
$$ LANGUAGE plpgsql;
