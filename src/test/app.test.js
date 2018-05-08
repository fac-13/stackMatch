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

