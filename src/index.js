const app = require('./app');
const https = require('https');
const fs = require('fs');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

const httpsOptions = {
  key: fs.readFileSync('./keys/key.pem'),
  cert: fs.readFileSync('./keys/cert.pem')
};

const server = https
  .createServer(httpsOptions, app)
  .listen(port, () => {
    console.log(`app is running on https://${host}:${port}`);
  });