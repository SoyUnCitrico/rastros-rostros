const message = require('../components/message/network-message');
const photo = require('../components/photos/network-photos');

const routes = (server) => {
  server.use('/message', message);
  server.use('/photo', photo)
}

module.exports = routes;