const db = require('mongoose');
db.Promise = global.Promise;

const connect = async(url) => {
  await db.connect(url, {
    useNewUrlParser: true,
    })
    .then(()=>console.log("[db] Conectada con exito"))
    .catch(e => console.log("Error en la conexión con la base de datos: ", e));
}

module.exports = {
  connect,
};