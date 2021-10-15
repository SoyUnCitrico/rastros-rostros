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

const getLastIndex = async() => {
    let index = await Model.count()
    return index + 1;
}

module.exports = {
    add: addPhoto,
    get: getPhoto,
    list: listPhotos,
    index: getLastIndex,
}