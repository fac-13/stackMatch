const test = require('tape');
const request = require('supertest');
const app = require('./../app.js');

test('APP.JS & CONTROLLER TESTS', (t) => {
  t.ok(true, 'tape is working');
  t.end();
});

test(`SERVER: Test if Express app is running on http://${process.env.HOST}:${
  process.env.PORT
} or http://localhost:3000/`, (t) => {
  request(app)
    .get('/')
    .end((err, res) => {
      t.ok(res, `response received with status code: ${res.status}`);
      t.error(err, 'no server error');
      t.end();
    });
});

test('SERVER: Test if home route gets status code 200 and returns html content', (t) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'should return 200');
      t.error(err, 'no server error');
      t.end();
    });
});

// AUTHENTICATION TESTS
test('OAUTH: Test if /auth/github/signup route redirects to Github', (t) => {
  request(app)
    .get('/auth/github/signup')
    .expect(302)
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'should return 302');
      t.error(err, 'no server error');
      t.end();
    });
});

test('OAUTH: Test if /auth/github/callback route redirects', (t) => {
  request(app)
    .get('/auth/github/callback')
    .expect(302)
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'should return 302');
      t.error(err, 'no server error');
      t.end();
    });
});

test('OAUTH: Test if /auth/github/logout route redirects', (t) => {
  request(app)
    .get('/auth/github/logout')
    .expect(302)
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'should return 302');
      t.error(err, 'no server error');
      t.end();
    });
});

// FOR PROTECTED ROUTES
test('Test for /myprofile/1 - unauthorised', (t) => {
  request(app)
    .get('/myprofile/1')
    .expect(302)
    .end((err, res) => {
      if (err) console.log('ERROR', err.message);
      t.equal(res.statusCode, 302, `should return 302, instead got: ${res.statusCode}`);
      t.equal(res.headers.location, '/', 'should redirect to / when not logged in');
      t.error(err, 'no server error');
      t.end();
    });
});

test('Test for /savePersonalDetails (post request) - unauthorised', (t) => {
  request(app)
    .post('/savePersonalDetails')
    .expect(302)
    .end((err, res) => {
      if (err) console.log('ERROR', err.message);
      t.equal(res.statusCode, 302, `should return 302, instead got: ${res.statusCode}`);
      t.equal(res.headers.location, '/', 'should redirect to / when not logged in');
      t.error(err, 'no server error');
      t.end();
    });
});

// 404 ERROR HANDLING ROUTES
test('ERRORS: Test if server returns 404 on invalid route', (t) => {
  request(app)
    .get('/notavalidroute')
    .expect(404)
    .end((err, res) => {
      t.equal(res.statusCode, 404, 'should return 404');
      t.error(err, 'no server error');
      t.end();
    });
});

