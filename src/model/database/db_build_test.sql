BEGIN;

DROP TABLE IF EXISTS members, fac_code, member_tech_stack, tech_stack CASCADE;

CREATE TABLE fac_code (
  id SERIAL PRIMARY KEY,
  code VARCHAR(255)
);

CREATE TABLE tech_stack (
  id SERIAL PRIMARY KEY,
  tech VARCHAR(255) NOT NULL
);

CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  github_id INTEGER NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  github_handle VARCHAR(255) NOT NULL,
  fac_campus VARCHAR(255),
  fac_code_id INTEGER,
  linkedin_url VARCHAR(4000),
  twitter_handle VARCHAR(255),
  member_type VARCHAR(255),
  job_search_status VARCHAR(255),
  min_years_exp INTEGER,
  max_years_exp INTEGER,
  github_cv_url VARCHAR(4000),
  cv_url VARCHAR(4000),
  job_view_pref VARCHAR(255),
  FOREIGN KEY (fac_code_id) REFERENCES fac_code(id)
);

CREATE TABLE member_tech_stack (
  member_id INTEGER NOT NULL,
  stack_id INTEGER NOT NULL,
  order_num INTEGER,
  PRIMARY KEY (stack_id, member_id),
  FOREIGN KEY (member_id) REFERENCES members(id),
  FOREIGN KEY (stack_id) REFERENCES tech_stack(id)
);

INSERT INTO fac_code
  (code)
VALUES
  ('FAC0'),
  ('FAC1');

INSERT INTO tech_stack
  (tech)
VALUES
  ('JavaScript'),
  ('Node.js');

INSERT INTO members
  (github_id, first_name, last_name, github_handle, fac_campus, fac_code_id, linkedin_url, twitter_handle, member_type, job_search_status, min_years_exp, max_years_exp, github_cv_url, cv_url, job_view_pref)
VALUES
  (1, 'Helen', 'Zhou', 'helenzhou6', 'london', 1, 'https://uk.linkedin.com/', 'hel_zhou', 'admin', 'red', 0, 1, 'https://github.com/helenzhou6/CV', 'https://github.com/helenzhou6/CV', 'private'),
  (2, 'Deborah', 'Smith', 'dsmith', 'gaza', 2, 'https://uk.linkedin.com/dbsmith', 'dbsmith', 'member', 'yellow', 2, 5, NULL, NULL, 'public');
  
INSERT INTO member_tech_stack
  (member_id, stack_id, order_num)
VALUES
  (1, 1, 1),
  (1, 2, 2),
  (2, 1, 2),
  (2, 2, 1);

COMMIT;