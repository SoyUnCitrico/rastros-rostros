const Model = require('./model-photos');

const addPhoto = (photo) => {
     const myPhoto = new Model(photo);
     myPhoto.save();     
}

const getPhoto = async () => {}

const listPhotos = async () => {
    console.log("Trayendo fotos de la DB")
    const photos = await Model.find();
    return photos;
}

module.exports = {
    add: addPhoto,
    get: getPhoto,
    list: listPhotos,
}