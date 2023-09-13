const httpStatus = require("http-status");
const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const { TatorService } = require("../../services/tool.services/tarot.service");

const CreateTarot = catchAsync(
    async (req, res) => {
        const data = JSON.parse(req.body.data)
        const result = await TatorService.createTarotService(data, req.files);
        sendResponse(res, httpStatus.OK, true, "Tarot card created successfully.", result)
    })

module.exports.TarotController = {
    CreateTarot,

}