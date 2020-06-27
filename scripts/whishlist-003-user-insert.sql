
DROP FUNCTION IF EXISTS whishlist_user_insert(TEXT, TEXT);
CREATE FUNCTION whishlist_user_insert(email_token TEXT, full_name_token TEXT)
RETURNS UUID AS $$
DECLARE id_token UUID;
BEGIN

    IF NOT EXISTS (
        SELECT
            1
        FROM
            whishlist_user
        WHERE
            email = email_token
            AND
            updated_at IS NULL
            AND
            deleted_at IS NULL
        ) THEN
        id_token := uuid_generate_v4();

        INSERT INTO whishlist_user (id, email, full_name)
        VALUES (id_token, email_token, full_name_token);

        RETURN id_token;
    ELSE
        RETURN '00000000-0000-0000-0000-000000000000';
    END IF;

END;
$$ LANGUAGE plpgsql;
