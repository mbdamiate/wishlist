
DROP FUNCTION IF EXISTS whishlist_user_update(UUID, TEXT);
CREATE FUNCTION whishlist_user_update(id_token UUID, full_name_token TEXT)
RETURNS UUID AS $$
DECLARE new_uuid_token UUID;
BEGIN

    IF EXISTS (
        SELECT
            1
        FROM
            whishlist_user
        WHERE
            id = id_token
            AND
            full_name <> full_name_token
            AND
            updated_at IS NULL
            AND
            deleted_at IS NULL
        ORDER BY
            created_at DESC
        FETCH
            FIRST 1 ROWS ONLY
        ) THEN
        UPDATE
            whishlist_user
        SET
            updated_at = NOW()
        WHERE
            id = id_token;
        
        new_uuid_token := uuid_generate_v4();

        INSERT INTO
            whishlist_user
        SELECT
            new_uuid_token,
            email,
            full_name_token
        FROM
            whishlist_user
        WHERE
            id = id_token;
    ELSE
        new_uuid_token := id_token;
    END IF;

    RETURN new_uuid_token;

END;
$$ LANGUAGE plpgsql;
