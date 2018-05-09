const app = require('./app');
const https = require('https');
const fs = require('fs');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const httpsOptions = {
  key: fs.readFileSync('./keys/key.pem'),
  cert: fs.readFileSync('./keys/cert.pem')
};

app.listen(port, () => {
  console.log(`app is running on http://${host}:${port}`);
});

const server = https
  .createServer(httpsOptions, app)
  .listen(port, () => {
    console.log(`app is running on http://${host}:${port}`);
  });