const test = require('tape');

const { addUserStatus } = require('../controllers/middleware');
const { jobStatusText, jobPrefIsPublic } = require('../views/helpers/index');

test('Test if tape is working', (t) => {
  t.ok(true, 'tape is working');
  t.end();
});

// MIDDLEWARE -- Add User Status Function
test('Test addUserStatus - registeredProfile: true', (t) => {
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
  const actual = addUserStatus(request);
  const expected = {
    id: 1,
    status: {
      login: true,
      signup: false,
    }
  }
  t.deepEquals(actual, expected, 'returns expected result (deepequals)');
  t.deepEquals(request, originalRequest, 'not mutated original request object');
  t.end();
});

test('Test addUserStatus - registeredProfile: false', (t) => {
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
  const actual = addUserStatus(request);
  const expected = {
    id: 1,
    status: {
      login: false,
      signup: true,
    }
  }
  t.deepEquals(actual, expected, 'returns expected result (deepequals)');
  t.deepEquals(request, originalRequest, 'not mutated original request object');
  t.end();
});

// HANDLEBARS HELPERS

// jobStatusText function tests

test('Test jobStatusText', (t) => {
  t.equals(jobStatusText('red'), 'Not Looking', 'jobStatusText(red) returns correct result');
  t.equals(jobStatusText('orange'), 'Open to opportunities', 'jobStatusText(orange) returns correct result');
  t.equals(jobStatusText('green'), 'Currently Looking', 'jobStatusText(green) returns correct result');
  t.end();
});


// jobPrefIsPublic function tests

test('Test jobPrefIsPublic', (t) => {
  t.equals(jobPrefIsPublic('private'), false, 'jobPrefIsPrivate(\'private\') returns correct result');
  t.equals(jobPrefIsPublic('public'), true, 'jobPrefIsPrivate(\'public\') returns correct result');
  t.end();
});
