const test = require('tape');
const sinon = require('sinon');
const request = require('supertest');
const app = require('./../app.js');

test('Test if tape is working', (t) => {
  t.ok(true, 'tape is working');
  t.end();
});

test(`Test if Express app is running on http://${process.env.HOST}:${
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

test('Test if home route gets status code 200 and is html', (t) => {
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
test('Test if /auth/github/signup route redirects to Github', (t) => {
  request(app)
    .get('/auth/github/signup')
    .expect(302)
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'should return 302');
      t.error(err, 'no server error');
      t.end();
    });
});

test('Test if /auth/github/callback route redirects', (t) => {
  request(app)
    .get('/auth/github/callback')
    .expect(302)
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'should return 302');
      t.error(err, 'no server error');
      t.end();
    });
});

test('Test if /auth/github/logout route redirects', (t) => {
  request(app)
    .get('/auth/github/logout')
    .expect(302)
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'should return 302');
      t.error(err, 'no server error');
      t.end();
    });
});

// ERROR HANDLING ROUTES
test('Test if server returns 404 on invalid route', (t) => {
  request(app)
    .get('/notavalidroute')
    .expect(404)
    .end((err, res) => {
      t.equal(res.statusCode, 404, 'should return 404');
      t.error(err, 'no server error');
      t.end();
    });
});


// TODO 500 server error test
test('Test if server returns 500 on server error', (t) => {
  request(app)
    .get('/brokenroute')
    .end((err, res) => {
      t.ok(
        res.text.includes('Internal Server Error'),
        'response includes "internal server error" message for client',
      );
      t.equal(res.statusCode, 500, 'should return 500');
      t.error(err, 'server error');
      t.end();
    });
});
