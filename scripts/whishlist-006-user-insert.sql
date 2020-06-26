
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
