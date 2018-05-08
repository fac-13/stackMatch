const app = require('./app');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is running on http://${host}:${port}`);
});
