
DROP FUNCTION IF EXISTS whishlist_user_update(UUID, TEXT, TEXT);
CREATE FUNCTION whishlist_user_update(id_token UUID, email_token TEXT, full_name_token TEXT)
RETURNS UUID AS $$
BEGIN

    UPDATE
        whishlist_user
    SET
        was_updated = TRUE
    WHERE
        id = id_token;

    RETURN whishlist_user_insert(email_token, full_name_token);

END;
$$ LANGUAGE plpgsql;
