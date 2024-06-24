DROP TABLE IF EXISTS users;
CREATE TABLE users  (
  id SERIAL primary key,
  username char(32)  NOT NULL DEFAULT '',
  password char(100) NOT NULL DEFAULT  '',
  mobile char(11) NOT NULL DEFAULT '',
  email char(100) NOT NULL,
  nickname char(32) NOT NULL DEFAULT '' ,
  avatar char(200)  NOT NULL DEFAULT '' ,
  gender int NOT NULL DEFAULT 0 ,
  intro char(255) NOT NULL ,
  status int  NOT NULL DEFAULT 0 ,
  is_deleted int NOT NULL DEFAULT 0 ,
  create_time timestamp(6) NOT NULL DEFAULT NULL ,
  update_time timestamp(6) NOT NULL 
); 
