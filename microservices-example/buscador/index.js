const express = require('express');
const app = express();
const appid = process.env.APPID;
const router = require('./routes');
const mongoose = require('mongoose');
require('./bus');

app.use(express.json());
// Connect to MongoDB
mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected - Buscador'))
  .catch(err => console.log(err));

app.use('/buscador', router);

app.listen(appid, () => console.info(`${appid} is listening on ${appid}`));
