const Model = require('./model-message');

const addMessage = (message) => {
  // list.push(message);
  const myMessage = new Model(message);
  myMessage.save();
}

const getMessages = async () => {
  const messages = await Model.find();
  return messages;
}

const updateText = async (id, message) => {
  const foundMessage = await Model.findOne({
    _id: id
  })
  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  // update
  // delete
}