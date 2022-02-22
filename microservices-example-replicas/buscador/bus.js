const nats = require('node-nats-streaming');
const { randomBytes } = require('crypto');
const Cosa = require('./model');

const stan = nats.connect('nats_example', 'buscador_client' + randomBytes(6).toString('hex'), {
  url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`
});

stan.on('connect', async () => {
  console.log('BUSCADOR - Publisher connected to NATS');

  stan.subscribe('cosas:add').on('message', msg => {
    const data = JSON.parse(msg.getData());
    console.log(data);
    if (data) new Cosa(data).save();
  });
});
