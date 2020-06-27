
DROP FUNCTION IF EXISTS whishlist_user_delete(UUID);
CREATE FUNCTION whishlist_user_delete(id_token UUID)
RETURNS UUID AS $$
BEGIN

    IF (id_token = (SELECT id FROM whishlist_user WHERE updated_at IS NULL AND deleted_at IS NULL ORDER BY created_at DESC FETCH FIRST 1 ROW ONLY)) THEN
        UPDATE
            whishlist_user
        SET
            deleted_at = NOW()
        WHERE
            id = id_token;

        RETURN id_token;
    ELSE
        RETURN '00000000-0000-0000-0000-000000000000';
    END IF;

END;
$$ LANGUAGE plpgsql;
