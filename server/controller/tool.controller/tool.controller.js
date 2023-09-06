const httpStatus = require("http-status");
const { ToolService } = require("../../services/tool.services/tool.service");
const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");

const UpdateORInsertORBDeafultChat = catchAsync(
    async (req, res) => {
        const result = await ToolService.UpdateORInsertORBDeafultChatService(req.body);
        sendResponse(res, httpStatus.OK, true, "Default message updated successfully", result)
    })

module.exports.ToolController = {
    UpdateORInsertORBDeafultChat,
}