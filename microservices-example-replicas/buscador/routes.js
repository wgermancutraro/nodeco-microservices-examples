const router = require('express').Router();
const Cosa = require('./model');

router.get('/', async (req, res) => {
  const items = await Cosa.find({});

  return res.status(200).json({ items, appid: process.env.APPID });
});

router.get('/:name', async (req, res) => {
  const item = await Cosa.findOne({ name: { $regex: req.params.name.trim(), $options: 'i' } });
  if (!item) return res.status(404).json({ error: 'Item not found' });

  return res.status(200).json({ item, appid: process.env.APPID });
});

module.exports = router;
