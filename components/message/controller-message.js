const store = require('./store-message');

const addMessage = (user, message, location = null) => {

  return new Promise((resolve, reject) => {
    
    if(!user || !message) {
      console.error("[messageController] No hay usuario o mensaje");
      reject("Los datos son correctos");
      return false;
    }

    const fullMessage = {
      user: user,
      message: message,
      date: new Date(),
      location: location,
    };
    
    store.add(fullMessage);
    resolve(fullMessage);  
  });
}

const getMessages = () => {
  return new Promise((resolve, reject ) => {
    resolve(store.list());
  });
}

const updateMessage = (id, message) => {
  return new Promise(async (resolve, reject) => {
    if(!id || !message) {
      reject("invalid data");
      return false;
    } 
    const result = await store.updateText(id, message);
    resolve(result);
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
}