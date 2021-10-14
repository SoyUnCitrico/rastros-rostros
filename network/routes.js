const photo = require('../components/photos/network-photos');

const routes = (server) => {
  server.use('/photo', photo)
}

module.exports = routes;