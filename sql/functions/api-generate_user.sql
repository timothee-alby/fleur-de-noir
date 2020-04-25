CREATE OR REPLACE FUNCTION api.generate_user()
RETURNS table (jwt TEXT)
LANGUAGE SQL AS
$$
  SELECT
    public.sign(
      ROW_TO_JSON(data), current_setting('app.jwt_secret')
    ) AS jwt
  FROM (
    SELECT gen_random_uuid() AS user_id
  ) AS data;
$$;

ALTER FUNCTION api.generate_user() OWNER TO master;