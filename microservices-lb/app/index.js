const app = require('express')();
const appid = process.env.APPID;

app.get('/', (req, res) => res.send(`${appid} home page: says hello!`));

app.listen(appid, () => console.info(`${appid} is listening on ${appid}`));
