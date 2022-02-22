const express = require('express');
const app = express();
const appid = process.env.APPID;
const router = require('./routes');
const mongoose = require('mongoose');

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected - Cosas'))
  .catch(err => console.log(err));

app.use('/cosas', router);

app.listen(appid, () => console.info(`${appid} is listening on ${appid}`));
