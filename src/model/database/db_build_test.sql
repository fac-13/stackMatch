BEGIN;

DROP TABLE IF EXISTS members, fac_cohort, member_tech_stack, tech_stack CASCADE;

CREATE TABLE fac_cohort (
  id SERIAL PRIMARY KEY,
  cohort VARCHAR(255)
);

CREATE TABLE tech_stack (
  id SERIAL PRIMARY KEY,
  tech VARCHAR(255) NOT NULL
);

CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  github_id INTEGER NOT NULL,
  full_name VARCHAR(255),
  github_handle VARCHAR(255) NOT NULL,
  github_avatar_url VARCHAR(4000),
  fac_campus VARCHAR(255),
  fac_cohort_id INTEGER,
  linkedin_url VARCHAR(4000),
  twitter_handle VARCHAR(255),
  member_type VARCHAR(255),
  job_view_pref VARCHAR(255),  
  job_search_status VARCHAR(255),
  years_experience INTEGER,
  github_cv_url VARCHAR(4000),
  cv_url VARCHAR(4000),
  FOREIGN KEY (fac_cohort_id) REFERENCES fac_cohort(id)
);

CREATE TABLE member_tech_stack (
  member_id INTEGER NOT NULL,
  stack_id INTEGER NOT NULL,
  order_num INTEGER,
  PRIMARY KEY (stack_id, member_id),
  FOREIGN KEY (member_id) REFERENCES members(id),
  FOREIGN KEY (stack_id) REFERENCES tech_stack(id)
);

INSERT INTO fac_cohort
  (cohort)
VALUES
  ('FAC0'),
  ('FAC1');

INSERT INTO tech_stack
  (tech)
VALUES
  ('JavaScript'),
  ('Node.js');

INSERT INTO members
  (github_id, full_name, github_handle, github_avatar_url, fac_campus, fac_cohort_id, linkedin_url, twitter_handle, member_type, job_view_pref, job_search_status, years_experience, github_cv_url, cv_url)
VALUES
  (1, 'Helen', 'helenzhou6', 'https://uk.linkedin.com/dbsmith', 'london', 1, 'https://uk.linkedin.com/', 'hel_zhou', 'admin', 'private', 'red', 1, 'https://github.com/helenzhou6/CV', 'https://github.com/helenzhou6/CV'),
  (2, 'Deborah', 'dsmith', 'https://uk.linkedin.com/dbsmith', 'gaza', 2, 'https://uk.linkedin.com/dbsmith', 'dbsmith', 'member', 'public', 'orange', 5, NULL, NULL),
  (3, 'Lawrence', 'lawRES', 'https://uk.linkedin.com/law', 'london', 1, 'https://uk.linkedin.com/lawres', 'lawres', 'admin', 'private', 'red', 1, 'https://github.com/lawres/CV', 'https://github.com/lawres/CV');
  
INSERT INTO member_tech_stack
  (member_id, stack_id, order_num)
VALUES
  (1, 1, 1),
  (1, 2, 2),
  (2, 1, 2),
  (2, 2, 1);

COMMIT;