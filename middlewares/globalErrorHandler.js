const globalErrorHandler = (err, req, res, next) => {
    
    let statusCode = err.statusCode || 400;
    let msg = err?.message || "Something went wrong";
    console.log(err)
    if(err?.name === "ValidationError"){
       
        msg = err?.errors[0]?.message;
    }
    if(err?.name === "JsonWebTokenError"){
        statusCode = 401;
        msg = "You are not authorized to access this route"
    }
    // console.log(msg)
  
    res.status(statusCode);
    res.json({
        success: false,
        message: msg,
        error:err,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = globalErrorHandler;