const httpStatus = require("http-status");
const { ToolService } = require("../../services/tool.services/tool.service");
const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");

const getMagicORBDefaultChat = catchAsync(
    async (req, res) => {
        const result = await ToolService.getMagicORBDefaultChatService();
        sendResponse(res, httpStatus.OK, true, "Default message retrived successfully", result)
    })

const UpdateORInsertORBDeafultChat = catchAsync(
    async (req, res) => {
        const result = await ToolService.UpdateORInsertORBDeafultChatService(req.body);
        sendResponse(res, httpStatus.OK, true, "Default message updated successfully", result)
    })

module.exports.ToolController = {
    getMagicORBDefaultChat,
    UpdateORInsertORBDeafultChat,
}