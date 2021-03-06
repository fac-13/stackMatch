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
  github_id INTEGER UNIQUE NOT NULL,
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
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (stack_id) REFERENCES tech_stack(id)
);

COMMIT;