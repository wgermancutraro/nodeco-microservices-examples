const router = require('express').Router();
const Cosa = require('./model');
const stan = require('./bus');

router.get('/', async (_, res) => {
  const items = await Cosa.find({});

  return res.status(200).json(items);
});

router.post('/', async (req, res) => {
  const data = { name: req.body.name };
  const item = await Cosa.create(data);

  stan.publish('cosas:add', JSON.stringify(data), (err, guid) => {
    if (err) console.log('publish failed: ' + err);
    else console.log('published message with guid: ' + guid);
  });

  return res.status(200).json(item);
});

module.exports = router;
