const httpStatus = require("http-status");
const { ToolService } = require("../../services/tool.services/tool.service");
const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");

const getMagicORBDefaultChat = catchAsync(
    async (req, res) => {
        const result = await ToolService.getMagicORBDefaultChatService();
        sendResponse(res, httpStatus.OK, true, "Defaults retrived successfully", result)
    })


/* 
    * only update the default promt message
    * create promt messafe with default filter fileds & chatgpt version
*/
const UpdateORInsertORBDeafultChat = catchAsync(
    async (req, res) => {
        const result = await ToolService.UpdateORInsertORBDeafultChatService({ content: req.body.content });
        sendResponse(res, httpStatus.OK, true, "Default message updated successfully", result)
    })


/* 
    * update other fields without default promt message
*/
const UpdateDefaultOtherFields = catchAsync(
    async (req, res) => {
        const result = await ToolService.UpdateDefaultOtherFieldsService(req.params.defaultId, req.body);
        sendResponse(res, httpStatus.OK, true, "Defaults updated successfully", result)
    })

module.exports.ToolController = {
    getMagicORBDefaultChat,
    UpdateORInsertORBDeafultChat,
    UpdateDefaultOtherFields,
}