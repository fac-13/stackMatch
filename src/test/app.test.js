const test = require('tape');
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
      t.equal(res.statusCode, 200, 'Should return 200');
      t.error(err, 'no server error');
      t.end();
    });
});

test('Test if signup route gets status code 200', (t) => {
  request(app)
    .get('/auth/github')
    .expect(200)
    .end((err, res) => {
      t.equal(res.statusCode, 200, 'Should return 200');
      t.error(err, 'no server error');
      t.end();
    });
});
