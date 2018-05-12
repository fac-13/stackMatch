const test = require('tape');

const { updateUserSession } = require('../controllers/middleware');

test('Test if tape is working', (t) => {
  t.ok(true, 'tape is working');
  t.end();
});

// UPDATE USER SESSION
test('Test updateUserSession - registeredProfile: true', (t) => {
  const originalRequest = {
    user: {
      id: 1,
    },
    session: {
      registeredProfile: true,
    }
  }
  const request = {
    user: {
      id: 1,
    },
    session: {
      registeredProfile: true,
    }
  }
  const actual = updateUserSession(request);
  const expected = {
    id: 1,
    session: {
      login: true,
      signup: false,
    }
  }
  t.deepEquals(actual, expected, 'returns expected result (deepequals)');
  t.deepEquals(request, originalRequest, 'not mutated original request object');
  t.end();
});

test('Test updateUserSession - registeredProfile: false', (t) => {
  const originalRequest = {
    user: {
      id: 1,
    },
    session: {
      registeredProfile: false,
    }
  }
  const request = {
    user: {
      id: 1,
    },
    session: {
      registeredProfile: false,
    }
  }
  const actual = updateUserSession(request);
  const expected = {
    id: 1,
    session: {
      login: false,
      signup: true,
    }
  }
  t.deepEquals(actual, expected, 'returns expected result (deepequals)');
  t.deepEquals(request, originalRequest, 'not mutated original request object');
  t.end();
});