CREATE TABLE IF NOT EXISTS user_profile_auth_ikqgm_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  created_at timestamp DEFAULT now()
);
