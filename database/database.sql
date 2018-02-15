--CREATE EXTENSION pgcrypto;


-- ---
-- Table  users
--
-- ---
DROP TABLE  IF EXISTS  users CASCADE;
DROP TYPE IF EXISTS  user_type ;

CREATE TYPE user_type AS ENUM ('TEST', 'ENGINEER');

CREATE TABLE users  (
   id           uuid,
   first_name   VARCHAR(255),
   last_name    VARCHAR(255),
   birthdate    VARCHAR(255),
   sex          VARCHAR(1),
   email        VARCHAR(255),
   phone_number VARCHAR(255),
   user_type    user_type,
   external_id  VARCHAR(255),
   PRIMARY KEY ( id )
);



-- ---
-- Table  user_profiles
--
-- ---
DROP TABLE IF EXISTS  user_profiles ;

DROP TYPE IF EXISTS  panel ;
DROP TYPE IF EXISTS  sex ;
DROP TYPE IF EXISTS  practice_type ;
DROP TYPE IF EXISTS  category ;
DROP TYPE IF EXISTS  skate_width ;
DROP TYPE IF EXISTS  hockey_size ;
DROP TYPE IF EXISTS  size ;


CREATE TYPE panel AS ENUM ('EXPERT', '');
-- CREATE TYPE sex AS ENUM ('H', 'F');
CREATE TYPE practice_type AS ENUM ('ICE', 'ROLLER');
CREATE TYPE category AS ENUM (
  'JUNIOR',
  'U20',
  'LOISIR',
  'LOISIR COMPETITION',
  'FEMININ EXCELLENCE',
  'FEMININ ELITE',
  'D3',
  'D2',
  'D1',
  'MAGNUS'
);
CREATE TYPE skate_width AS ENUM ('D', 'EE', '');
CREATE TYPE hockey_size AS ENUM (
  'YTH XS',
  'YTH S',
  'YTH M',
  'YTH L',
  'JR S',
  'JR M',
  'JR L',
  'JR XL',
  'SR S',
  'SR M',
  'SR L',
  'SR XL',
  'SR XXL'
);
CREATE TYPE size AS ENUM ('JUNIOR','XS','S','M','L','XL');

CREATE TABLE  user_profiles  (
   id                     uuid,
   user_id                uuid,
   expert_panel           VARCHAR(255),
   height                 INTEGER,
   weight                 INTEGER,
   practice_type          VARCHAR(255),
   club_city              VARCHAR(255),
   club_name              VARCHAR(255),
   start_of_practice_year INTEGER,
   category               VARCHAR(255),
   shoe_size              VARCHAR(255),
   skate_width            VARCHAR(255),
   shin_gard_size         VARCHAR(255),
   pant_size              VARCHAR(255),
   elbow_pad_size         VARCHAR(255),
   shoulder_pad_size      VARCHAR(255),
   glove_size             INTEGER,
   helmet_size            VARCHAR(255),
   head_size              INTEGER,
   PRIMARY KEY ( id )
);

-- ---
-- Table  tests
--
-- ---


DROP TABLE IF EXISTS  tests CASCADE ;
DROP TYPE IF EXISTS  test_type ;
DROP TYPE IF EXISTS  test_status ;


CREATE TYPE test_type AS ENUM (
  'STATIC_FITTING',
  'DYNAMIC_FITTING',
  'FIELD',
  'SENSORIAL',
  'DURABILITY',
  'USAGE'
);
CREATE TYPE test_status AS ENUM ('NOT_STARTED','IN_PROGRESS','DONE');


CREATE TABLE  tests  (
   id                   uuid,
   type                 test_type,
   test_reference       VARCHAR,
   title                VARCHAR,
   product              VARCHAR,
   status               test_status,
   description          VARCHAR,
   validation_threshold VARCHAR,
   timing               VARCHAR,
   image_src            VARCHAR,
   evaluation_form_path   VARCHAR,
   evaluation_results_path  VARCHAR,
   created_by            uuid,
  PRIMARY KEY ( id )
);

-- ---
-- Table  test_participants
--
-- ---

DROP TABLE IF EXISTS  test_participants ;
DROP TYPE IF EXISTS  invitation_status ;
DROP TYPE IF EXISTS  evaluation_status ;


CREATE TYPE invitation_status AS ENUM ('ACCEPTED','REJECTED','IGNORED');
CREATE TYPE evaluation_status AS ENUM ('FILLED','NOT_FILLED');

CREATE TABLE  test_participants  (
   id                 uuid,
   test_id            uuid,
   user_id            uuid,
   invitation_status  invitation_status,
   evaluation_status  evaluation_status,
   evaluation_rating  INTEGER,
  PRIMARY KEY ( id )
);

-- ---
-- Foreign Keys
-- ---
ALTER TABLE  user_profiles  ADD FOREIGN KEY (user_id) REFERENCES  users  ( id );
ALTER TABLE  test_participants  ADD FOREIGN KEY (test_id) REFERENCES  tests  ( id );
ALTER TABLE  test_participants  ADD FOREIGN KEY (user_id) REFERENCES  users  ( id );
ALTER TABLE  tests  ADD FOREIGN KEY (created_by) REFERENCES  users  ( id );
