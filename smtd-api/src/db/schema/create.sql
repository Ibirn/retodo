DROP TABLE IF EXISTS users
CASCADE;
DROP TABLE IF EXISTS tasks
CASCADE;

-- Users will need to be able to log in with email and password
CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL

);

-- Each users tasks tracked via user_id, organized in-app by category, hidden with is_active.
CREATE TABLE tasks
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  category VARCHAR(255) NOT NULL,
  created_on DATE NOT NULL,
  due_date DATE,
  completed_on DATE,

  info TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);