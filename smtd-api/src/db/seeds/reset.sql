-- Users table seeds here (Example)


insert into users
  (name, email, password)
values
  ('Stuart Burberry', 'a@b.com', 'abcd');
insert into users
  (name, email, password)
values
  ('Jewell O''Grada', 'jograda1@harvard.edu', 'abcd');

--
INSERT INTO tasks
  (user_id, category, created_on, due_date)
values
  (1, 'movie', '2021-01-02', '2021-04-05');
INSERT INTO tasks
  (user_id, category, created_on, due_date)
values
  (1, 'book', '2021-02-03', '2021-05-06');