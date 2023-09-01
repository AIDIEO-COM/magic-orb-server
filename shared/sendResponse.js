
const sendResponse = (res,statusCode, success=true, message="", data="") => {
    res.status(statusCode);
    res.json({
        statusCode,
        success,
        message,
        data,
    });
}

module.exports = sendResponse;