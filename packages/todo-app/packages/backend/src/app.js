const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const allRoutes = require('express-list-endpoints');

const router = require('./router');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);
app.get('/', (_, res) => {
  res.send('Hello. This is TODO App APIs');
});

app.listen(port, () => {
  console.log(`TODO app listening on port ${port}!`);
  console.log('Registered Routes: ');
  console.log(allRoutes(app));
});
