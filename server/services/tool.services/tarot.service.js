const Tarot = require("../../models/Tarot.Model");

const createTarotService = async (data, files) => {

    if (files.frontImg) {
        data.frontImg = files.frontImg[0].path
    } else {
        data.frontImg = ''
    }

    if (files.backImg) {
        data.backImg = files.backImg[0].path
    } else {
        data.backImg = ''
    }

    const result = await Tarot.create(data);
    return result;
}

module.exports.TatorService = {
    createTarotService,
}